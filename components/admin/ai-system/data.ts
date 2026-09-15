export type Role = 'writing' | 'drawing' | 'reviewing';

export interface ModelChoice {
  provider: string;
  model: string;
}

export type AiSystemPreview =
  | 'default'
  | 'retry-2'
  | 'retry-5'
  | 'unsaved'
  | 'retry-confirm'
  | 'saving'
  | 'save-failed'
  | 'toggles-empty'
  | 'loading'
  | 'error';

export const NOMINAL_TOKENS = 12;

export const ROLE_META: { id: Role; label: string; purpose: string }[] = [
  { id: 'writing', label: 'Writing', purpose: 'Composes and refines prompt text and catalog copy.' },
  { id: 'drawing', label: 'Drawing', purpose: 'Produces the rendered view from the brief.' },
  { id: 'reviewing', label: 'Reviewing', purpose: 'Compares a render against its photograph and reports deviations.' },
];

export const PROVIDERS = ['Anthropic', 'OpenAI', 'Google'];

export const MODELS: Record<string, string[]> = {
  Anthropic: ['claude-3-5-sonnet', 'claude-3-5-haiku', 'claude-3-opus'],
  OpenAI: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  Google: ['gemini-1.5-pro', 'gemini-1.5-flash', 'imagen-3'],
};

export const DEFAULT_MODELS: Record<Role, ModelChoice> = {
  writing: { provider: 'Anthropic', model: 'claude-3-5-sonnet' },
  drawing: { provider: 'OpenAI', model: 'gpt-4o' },
  reviewing: { provider: 'Anthropic', model: 'claude-3-5-haiku' },
};

export interface SettingValues {
  retryLimit: number;
  timeoutSeconds: number;
  linkExpiryDays: number;
  lowBalanceRenders: number;
  ageingDays: number;
}

export const DEFAULT_VALUES: SettingValues = {
  retryLimit: 10,
  timeoutSeconds: 120,
  linkExpiryDays: 14,
  lowBalanceRenders: 10,
  ageingDays: 5,
};

export const worstCaseTokens = (retryLimit: number): number => NOMINAL_TOKENS * (1 + retryLimit);

export const mismatchMultiple = (retryLimit: number): number => 1 + retryLimit;

export interface CostPoint {
  retryLimit: number;
  tokens: number;
  multiple: number;
}

export const COST_REFERENCE: CostPoint[] = [2, 5, 10].map((retryLimit) => ({
  retryLimit,
  tokens: worstCaseTokens(retryLimit),
  multiple: mismatchMultiple(retryLimit),
}));

export const TOGGLES: { id: string; label: string }[] = [];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const fmtDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};