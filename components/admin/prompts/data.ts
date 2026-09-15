export type Role = 'writing' | 'drawing' | 'reviewing';
export type Phase = 1 | 2;

export const ROLE_LABELS: Record<Role, string> = {
  writing: 'Writing',
  drawing: 'Drawing',
  reviewing: 'Reviewing',
};

export interface PromptVersion {
  version: number;
  savedAt: string;
  savedBy: string;
  text: string;
  referencedByRenders: boolean;
  changeNote: string;
}

export interface Prompt {
  key: string;
  systemKey: string;
  label: string;
  role: Role;
  groupId: string;
  groupLabel: string;
  phase: Phase;
  text: string;
  defaultText: string;
  edited: boolean;
  versions: PromptVersion[];
}

export interface MissingPrompt {
  systemKey: string;
  label: string;
  role: Role;
  groupId: string;
  groupLabel: string;
}

export interface PromptGroup {
  id: string;
  label: string;
  note: string;
  prompts: Prompt[];
  missing: MissingPrompt[];
}

export interface PromptSet {
  phase: Phase;
  label: string;
  note: string;
  expected: number;
  groups: PromptGroup[];
}

export interface Category {
  id: string;
  name: string;
  sets: PromptSet[];
}

export const HERO_PROMPT_KEY = 'ring.p1.front.generation';

const CATEGORY_DEFS: { id: string; name: string }[] = [
  { id: 'ring', name: 'Ring' },
  { id: 'pendant', name: 'Pendant' },
  { id: 'necklace', name: 'Necklace' },
  { id: 'earring', name: 'Earring' },
  { id: 'bracelet', name: 'Bracelet' },
  { id: 'brooch', name: 'Brooch' },
  { id: 'body', name: 'Body Jewelry' },
  { id: 'grillz', name: 'Grillz' },
  { id: 'watch', name: 'Watch' },
  { id: 'bail', name: 'Bail' },
  { id: 'clasp', name: 'Clasp' },
  { id: 'buckle', name: 'Buckle' },
  { id: 'cufflink', name: 'Cufflink' },
];

const VIEW_GROUPS = [
  { id: 'front', label: 'Front view', note: 'The face of the piece, straight on.' },
  { id: 'side', label: 'Side view', note: 'Profile, showing depth and setting height.' },
  { id: 'back', label: 'Back view', note: 'Underside, gallery and prong tips.' },
  { id: 'worn', label: 'Worn view', note: 'On the body, at true scale.' },
];

const VIEW_SPECS: { id: string; label: string; role: Role }[] = [
  { id: 'generation', label: 'Generation', role: 'drawing' },
  { id: 'detect', label: 'Detect and fix · detect', role: 'reviewing' },
  { id: 'fix', label: 'Detect and fix · fix', role: 'writing' },
];

const REFINE_GROUP = {
  id: 'refine',
  label: 'Refine',
  note: 'Adjustments made after a render is reviewed in the workshop.',
};

const REFINE_SPECS: { id: string; label: string; role: Role }[] = [
  { id: 'spec', label: 'Refine · specification', role: 'writing' },
  { id: 'metal', label: 'Refine · metal', role: 'writing' },
  { id: 'stone', label: 'Refine · stones', role: 'writing' },
  { id: 'proportion', label: 'Refine · proportions', role: 'writing' },
];

const DESCRIPTION_GROUP = {
  id: 'description',
  label: 'Description drafting',
  note: 'Catalog copy written from the product data.',
};

const DESCRIPTION_SPECS: { id: string; label: string; role: Role }[] = [
  { id: 'description', label: 'Description', role: 'writing' },
];

const EDITED_TEXTS: Record<string, string> = {
  'ring.p1.side.fix':
    'Correct only the deviations named in the side-view findings for the ring. Leave the stone, the finish and the lighting exactly as rendered.',
  'ring.p1.refine.metal':
    'Refine the metal tone of the ring to the supplied swatch, keeping the polish level unchanged. Do not shift shape, stones or background.',
  'ring.p2.front.generation':
    'Regenerate the front view of the ring from the replacement photograph. Match the new photograph\u2019s proportion and stone placement and discard the previous render\u2019s geometry.',
};

const MISSING: Record<string, string[]> = {
  grillz: ['p2.worn.detect'],
  watch: ['p1.worn.detect'],
};

function defaultText(categoryName: string, groupId: string, specId: string): string {
  const c = categoryName.toLowerCase();
  switch (specId) {
    case 'generation':
      return `Draw the ${groupId} view of the ${c} from the supplied brief. Keep the silhouette, proportions and metal tone faithful to the reference. Output one square image on a neutral background.`;
    case 'detect':
      return `Review the ${groupId} render of the ${c} against the brief. Report every deviation in shape, stone placement and proportion. Return the findings only, one per line.`;
    case 'fix':
      return `Correct the deviations reported for the ${groupId} view of the ${c}. Change only what the findings name and leave the rest of the render untouched.`;
    case 'spec':
      return `Refine the ${c} toward the brief\u2019s specification. Adjust the named details only and keep the remainder of the render unchanged.`;
    case 'metal':
      return `Refine the metal tone of the ${c} to the supplied swatch. Do not alter shape, stones, finish or lighting.`;
    case 'stone':
      return `Refine the stone setting of the ${c}. Adjust placement and prong geometry only, leaving the metal untouched.`;
    case 'proportion':
      return `Refine the proportions of the ${c} to the stated measurements. Keep the design itself unchanged.`;
    case 'description':
      return `Write the catalog description for the ${c}. Cover the material, the setting and the finish in plain language. Do not invent specifications absent from the brief.`;
    default:
      return '';
  }
}

const HERO_VERSIONS: PromptVersion[] = [
  {
    version: 1,
    savedAt: '2026-05-04 09:00',
    savedBy: 'CraftsmanAI',
    text: 'Draw the front view of the ring from the supplied brief. Keep the silhouette, proportions and metal tone faithful to the reference. Output one square image on a neutral background.',
    referencedByRenders: true,
    changeNote: 'Shipped default',
  },
  {
    version: 2,
    savedAt: '2026-06-18 11:20',
    savedBy: 'Admin · R. Mensah',
    text: 'Draw the front view of the ring from the supplied brief. Keep the silhouette, proportions and metal tone faithful to the reference.',
    referencedByRenders: false,
    changeNote: 'Dropped the closing background line',
  },
  {
    version: 3,
    savedAt: '2026-07-22 16:05',
    savedBy: 'Admin · R. Mensah',
    text: 'Draw the front view of the ring from the supplied brief. Keep the silhouette, proportions and metal tone faithful to the reference. Output one square image on a neutral background.',
    referencedByRenders: true,
    changeNote: 'Restored the background instruction',
  },
  {
    version: 4,
    savedAt: '2026-08-30 15:41',
    savedBy: 'Admin · You',
    text: 'Draw the front elevation of the ring from the supplied brief, centred and lit for ecommerce. Hold the shank width and the stone at true proportion, and show the prong tips from the front. Output one square image on a neutral background.',
    referencedByRenders: true,
    changeNote: 'Named the prong tips and the shank width',
  },
  {
    version: 5,
    savedAt: '2026-09-12 10:02',
    savedBy: 'Admin · You',
    text: 'Draw the front elevation of the ring from the supplied brief, centred and lit for ecommerce. Hold the shank width and the stone at true proportion, and show the prong tips from the front. Do not introduce engraving or a finish the brief does not name. Output one square image on a neutral background.',
    referencedByRenders: false,
    changeNote: 'Added the instruction not to invent a finish',
  },
];

function buildPrompt(
  cat: { id: string; name: string },
  phase: Phase,
  group: { id: string; label: string },
  spec: { id: string; label: string; role: Role }
): Prompt {
  const key = `p${phase}.${group.id}.${spec.id}`;
  const systemKey = `${cat.id}.${key}`;
  const def = defaultText(cat.name, group.id, spec.id);

  let current = def;
  let edited = false;
  let versions: PromptVersion[];

  if (systemKey === HERO_PROMPT_KEY) {
    edited = true;
    versions = HERO_VERSIONS;
    current = HERO_VERSIONS[HERO_VERSIONS.length - 1].text;
  } else if (EDITED_TEXTS[systemKey]) {
    edited = true;
    current = EDITED_TEXTS[systemKey];
    versions = [
      {
        version: 1,
        savedAt: '2026-05-04 09:00',
        savedBy: 'CraftsmanAI',
        text: def,
        referencedByRenders: true,
        changeNote: 'Shipped default',
      },
      {
        version: 2,
        savedAt: '2026-08-30 15:41',
        savedBy: 'Admin · You',
        text: current,
        referencedByRenders: false,
        changeNote: 'Clarified the wording',
      },
    ];
  } else {
    versions = [
      {
        version: 1,
        savedAt: '2026-05-04 09:00',
        savedBy: 'CraftsmanAI',
        text: def,
        referencedByRenders: true,
        changeNote: 'Shipped default',
      },
    ];
  }

  return {
    key,
    systemKey,
    label: spec.label,
    role: spec.role,
    groupId: group.id,
    groupLabel: group.label,
    phase,
    text: current,
    defaultText: def,
    edited,
    versions,
  };
}

function buildGroup(
  cat: { id: string; name: string },
  phase: Phase,
  group: { id: string; label: string; note: string },
  specs: { id: string; label: string; role: Role }[]
): PromptGroup {
  const prompts: Prompt[] = [];
  const missing: MissingPrompt[] = [];

  specs.forEach((spec) => {
    const key = `p${phase}.${group.id}.${spec.id}`;
    if (MISSING[cat.id]?.includes(key)) {
      missing.push({
        systemKey: `${cat.id}.${key}`,
        label: spec.label,
        role: spec.role,
        groupId: group.id,
        groupLabel: group.label,
      });
      return;
    }
    prompts.push(buildPrompt(cat, phase, group, spec));
  });

  return { id: group.id, label: group.label, note: group.note, prompts, missing };
}

function buildSet(cat: { id: string; name: string }, phase: Phase): PromptSet {
  const groups =
    phase === 1
      ? [...VIEW_GROUPS.map((g) => buildGroup(cat, 1, g, VIEW_SPECS)), buildGroup(cat, 1, REFINE_GROUP, REFINE_SPECS)]
      : [
          ...VIEW_GROUPS.map((g) => buildGroup(cat, 2, g, VIEW_SPECS)),
          buildGroup(cat, 2, DESCRIPTION_GROUP, DESCRIPTION_SPECS),
        ];

  return {
    phase,
    label: phase === 1 ? 'Phase 1' : 'Phase 2',
    note:
      phase === 1
        ? 'The bespoke design workflow. Four views plus the refine prompts.'
        : 'Catalog products, rebuilt from replaced photographs. No refine group.',
    expected: phase === 1 ? 16 : 13,
    groups,
  };
}

export const PROMPT_CATEGORIES: Category[] = CATEGORY_DEFS.map((cat) => ({
  id: cat.id,
  name: cat.name,
  sets: [buildSet(cat, 1), buildSet(cat, 2)],
}));

export const phaseLabel = (phase: Phase): string => (phase === 1 ? 'Phase 1' : 'Phase 2');

export const setPrompts = (set: PromptSet): Prompt[] => set.groups.flatMap((group) => group.prompts);

export const setMissing = (set: PromptSet): MissingPrompt[] => set.groups.flatMap((group) => group.missing);

export const setEditedCount = (set: PromptSet): number =>
  setPrompts(set).filter((prompt) => prompt.edited).length;

export const setComplete = (set: PromptSet): boolean => setMissing(set).length === 0;

export const categoryPromptCount = (category: Category): number =>
  category.sets.reduce((total, set) => total + setPrompts(set).length, 0);

export const categoryEditedCount = (category: Category): number =>
  category.sets.reduce((total, set) => total + setEditedCount(set), 0);

export const categoryMissingCount = (category: Category): number =>
  category.sets.reduce((total, set) => total + setMissing(set).length, 0);

export const categoryComplete = (category: Category): boolean => categoryMissingCount(category) === 0;

export const findCategory = (categories: Category[], id: string): Category | undefined =>
  categories.find((category) => category.id === id);

export const findPrompt = (categories: Category[], systemKey: string): Prompt | undefined => {
  for (const category of categories) {
    for (const set of category.sets) {
      for (const group of set.groups) {
        const prompt = group.prompts.find((item) => item.systemKey === systemKey);
        if (prompt) return prompt;
      }
    }
  }
  return undefined;
};

export const findCategoryOfPrompt = (categories: Category[], systemKey: string): Category | undefined =>
  categories.find((category) =>
    category.sets.some((set) =>
      set.groups.some((group) => group.prompts.some((prompt) => prompt.systemKey === systemKey))
    )
  );

export const nextVersionNumber = (prompt: Prompt): number =>
  prompt.versions.reduce((max, version) => Math.max(max, version.version), 0) + 1;

export function withNewVersion(categories: Category[], systemKey: string, text: string): Category[] {
  return categories.map((category) => ({
    ...category,
    sets: category.sets.map((set) => ({
      ...set,
      groups: set.groups.map((group) => ({
        ...group,
        prompts: group.prompts.map((prompt) => {
          if (prompt.systemKey !== systemKey) return prompt;
          return {
            ...prompt,
            text,
            edited: text !== prompt.defaultText,
            versions: [
              ...prompt.versions,
              {
                version: nextVersionNumber(prompt),
                savedAt: '2026-09-15 16:20',
                savedBy: 'Admin · You',
                text,
                referencedByRenders: false,
                changeNote: 'Saved from the console',
              },
            ],
          };
        }),
      })),
    })),
  }));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const fmtDate = (stamp: string): string => {
  const [date] = stamp.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

export const fmtStamp = (stamp: string): string => {
  const [date, time] = stamp.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}, ${time}`;
};