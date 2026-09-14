import type {
  EstimateInput,
  EstimateResult,
  EstimateStone,
  WidgetMetal,
} from './types';

const DAY_RATE = 140;
const NOMINAL_BUDGET = 2500;

const BASE: Record<string, { metal: number; stone: number; days: number }> = {
  ring: { metal: 260, stone: 420, days: 4 },
  pendant: { metal: 160, stone: 300, days: 2 },
  necklace: { metal: 320, stone: 380, days: 3 },
  bracelet: { metal: 340, stone: 380, days: 3 },
  earring: { metal: 120, stone: 180, days: 1 },
  brooch: { metal: 200, stone: 260, days: 2 },
  'body-jewelry': { metal: 150, stone: 150, days: 2 },
  grillz: { metal: 420, stone: 300, days: 4 },
  watch: { metal: 480, stone: 260, days: 5 },
  bail: { metal: 60, stone: 40, days: 1 },
  clasp: { metal: 90, stone: 60, days: 1 },
  buckle: { metal: 140, stone: 90, days: 2 },
  cufflink: { metal: 110, stone: 120, days: 1 },
};

const STONE: Record<EstimateStone, number> = {
  natural: 1.4,
  'lab-grown': 1,
};

const METAL: Record<WidgetMetal, number> = {
  yellow: 1,
  white: 1.08,
  rose: 1.05,
};

export const SIZE_SCHEMA: Record<string, { label: string; unit: string }> = {
  ring: { label: 'US ring size', unit: 'US' },
  necklace: { label: 'Pendant height', unit: 'mm' },
  pendant: { label: 'Height', unit: 'mm' },
  earring: { label: 'Height', unit: 'mm' },
  bracelet: { label: 'Wrist size', unit: 'in' },
};

export const GENERIC_SIZE = { label: 'Height', unit: 'mm' };
export const GENERIC_SIZE_NOTE = "We'll work the rest out from your design.";

export function sizeSchemaFor(category: string) {
  return SIZE_SCHEMA[category] ?? GENERIC_SIZE;
}

export function isGenericSize(category: string) {
  return !SIZE_SCHEMA[category];
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function sizeScale(category: string, size: number) {
  if (category === 'ring') return clamp(1 + (size - 7) * 0.04, 0.75, 1.8);
  if (category === 'bracelet') return clamp(1 + (size - 6.5) * 0.06, 0.75, 1.8);
  return clamp(1 + (size - 20) * 0.02, 0.65, 2);
}

export function computeEstimate(input: EstimateInput): EstimateResult | null {
  const base = BASE[input.category];
  if (!base) return null;
  if (!input.stone) return null;
  if (input.budget === null || !Number.isFinite(input.budget)) return null;

  const size = Number(input.size);
  if (!Number.isFinite(size) || size <= 0) return null;

  const scale = sizeScale(input.category, size);
  const tier = clamp(input.budget / NOMINAL_BUDGET, 0.75, 1.5);

  const metalFactor = METAL[input.metal] ?? 1;
  const metal = Math.round(base.metal * scale * metalFactor);
  const stones = Math.round(base.stone * STONE[input.stone] * tier * scale);
  const labor = Math.round(base.days * DAY_RATE * scale);

  const raw = metal + stones + labor;
  const low = Math.round(raw / 10) * 10;
  const high = Math.round((raw * 1.1) / 10) * 10;

  return { metal, stones, labor, low, high };
}

export function formatUsd(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}