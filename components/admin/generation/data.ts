export type LogState = 'populated' | 'none' | 'loading' | 'error';
export type StepStatus = 'produced' | 'passed' | 'failed';
export type Operation = 'draw' | 'check' | 'repair' | 'recheck';

export interface LogImage {
  name: string;
  caption: string;
  alt: string;
  src: string;
}

export interface LogStep {
  id: string;
  view: string;
  operation: Operation;
  time: string;
  summary: string;
  status: StepStatus;
  score?: string;
  costsRender: boolean;
  artefact: string | null;
  inputs: LogImage[];
  output: LogImage & { checked: boolean; failedCheck?: string };
  prompt: { label: string; version: number; text: string; model: string; settings: { label: string; value: string }[] };
}

export const PINNED_VERSION = 14;
export const CURRENT_VERSION = 16;
export const PROMPT_SET = 'ring';

export const REFERENCE = {
  product: 'Bridal 2026 · Product 14',
  retailer: 'Aurora & Co',
  generated: 'Generated 28 August 2026',
};

const PHOTO = {
  front:
    'https://readdy.ai/api/search-image?query=Studio%20product%20photograph%20of%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%20in%20a%20six%20claw%20setting%2C%20standing%20upright%20and%20photographed%20straight%20from%20the%20front%2C%20seamless%20pale%20grey%20studio%20background%2C%20soft%20even%20lighting%2C%20sharp%20focus%2C%20catalogue%20quality%2C%20no%20text%20or%20watermark&width=800&height=600&seq=genlog-photo-front&orientation=landscape',
  side:
    'https://readdy.ai/api/search-image?query=Studio%20product%20photograph%20of%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%20in%20a%20six%20claw%20setting%2C%20photographed%20in%20profile%20from%20the%20side%2C%20seamless%20pale%20grey%20studio%20background%2C%20soft%20even%20lighting%2C%20sharp%20focus%2C%20catalogue%20quality%2C%20no%20text%20or%20watermark&width=800&height=600&seq=genlog-photo-side&orientation=landscape',
  back:
    'https://readdy.ai/api/search-image?query=Studio%20product%20photograph%20of%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%20in%20a%20six%20claw%20setting%2C%20photographed%20from%20the%20back%20showing%20the%20plain%20polished%20band%2C%20seamless%20pale%20grey%20studio%20background%2C%20soft%20even%20lighting%2C%20sharp%20focus%2C%20no%20text%20or%20watermark&width=800&height=600&seq=genlog-photo-back&orientation=landscape',
  hand:
    'https://readdy.ai/api/search-image?query=Close%20up%20studio%20photograph%20of%20a%20hand%20wearing%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%2C%20seamless%20pale%20grey%20background%2C%20soft%20even%20lighting%2C%20sharp%20focus%2C%20catalogue%20quality%2C%20no%20text%20or%20watermark&width=800&height=600&seq=genlog-photo-hand&orientation=landscape',
};

const RENDER = {
  frontV1:
    'https://readdy.ai/api/search-image?query=Clean%20product%20render%20of%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%20in%20a%20six%20claw%20setting%2C%20front%20elevation%2C%20plain%20polished%20band%2C%20seamless%20pale%20grey%20background%2C%20even%20studio%20lighting%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=genlog-render-front-v1&orientation=landscape',
  sideV1:
    'https://readdy.ai/api/search-image?query=Clean%20product%20render%20of%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%20in%20a%20six%20claw%20setting%2C%20side%20elevation%20in%20profile%2C%20plain%20polished%20band%2C%20seamless%20pale%20grey%20background%2C%20even%20studio%20lighting%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=genlog-render-side-v1&orientation=landscape',
  sideV2:
    'https://readdy.ai/api/search-image?query=Clean%20product%20render%20of%20a%20white%20gold%20engagement%20ring%2C%20side%20elevation%20in%20profile%20with%20six%20evenly%20spaced%20claw%20settings%20and%20a%20single%20round%20diamond%2C%20plain%20polished%20band%2C%20seamless%20pale%20grey%20background%2C%20even%20studio%20lighting%2C%20no%20text&width=800&height=600&seq=genlog-render-side-v2&orientation=landscape',
  backV1:
    'https://readdy.ai/api/search-image?query=Clean%20product%20render%20of%20a%20white%20gold%20engagement%20ring%20seen%20from%20the%20back%2C%20plain%20polished%20band%20and%20six%20claw%20setting%20from%20behind%2C%20seamless%20pale%20grey%20background%2C%20even%20studio%20lighting%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=genlog-render-back-v1&orientation=landscape',
  wornV1:
    'https://readdy.ai/api/search-image?query=Clean%20product%20render%20of%20a%20white%20gold%20engagement%20ring%20with%20a%20single%20round%20diamond%20worn%20on%20a%20hand%2C%20hand%20and%20ring%20seen%20from%20the%20front%2C%20seamless%20pale%20grey%20background%2C%20even%20studio%20lighting%2C%20no%20text&width=800&height=600&seq=genlog-render-worn-v1&orientation=landscape',
};

function photo(view: string): LogImage {
  const map: Record<string, LogImage> = {
    Front: {
      name: 'front.png',
      caption: "The retailer's front photograph",
      alt: 'The front photograph supplied by the retailer, used as the input for this step',
      src: PHOTO.front,
    },
    Side: {
      name: 'side.png',
      caption: "The retailer's side photograph",
      alt: 'The side photograph supplied by the retailer, used as the input for this step',
      src: PHOTO.side,
    },
    Back: {
      name: 'back.png',
      caption: "The retailer's back photograph",
      alt: 'The back photograph supplied by the retailer, used as the input for this step',
      src: PHOTO.back,
    },
  };
  return map[view] ?? map.Front;
}

function renderOutput(view: string, name: string, src: string, checked: boolean): LogStep['output'] {
  return {
    name,
    caption: checked ? 'The render this check examined' : 'Produced by this step',
    alt: checked
      ? `The ${view.toLowerCase()} render named ${name}, examined as the output of this check`
      : `The ${view.toLowerCase()} render named ${name}, produced by this step`,
    src,
    checked,
  };
}

function drawPrompt(view: string, source: string, elevation: string): string {
  return [
    `View: ${view.toLowerCase()}, ${elevation}.`,
    'Piece: white gold engagement ring, six claw setting, single round brilliant, plain polished band.',
    `Source: ${source}.`,
    'Reproduce the piece exactly as it appears in the source. Preserve stone count, setting count, band profile and proportions. Do not add, remove or move stones.',
    'Background: seamless and plain, as supplied by the retailer.',
    'No text, no watermark, no hand, no props.',
  ].join('\n');
}

function checkPrompt(view: string): string {
  return [
    'Role: reviewer.',
    `Reference: the ${view.toLowerCase()} photograph.`,
    'Compare the generated image against the reference for the same view.',
    'Check, in this order: stone count, setting count, metal color, band profile, stone placement.',
    'Return a similarity score between 0.00 and 1.00, and name every difference you find.',
    'Do not judge background, lighting or framing.',
  ].join('\n');
}

const REPAIR_PROMPT = [
  'View: side, profile elevation. Regenerate the previous side render.',
  'The previous side render did not match the reference: it showed five stones where the reference shows six.',
  'Correct the stone count to six, keep every other element of the previous render unchanged, and keep the metal color and band profile as they were.',
  'Background: seamless and plain, as supplied by the retailer.',
  'No text, no watermark, no hand, no props.',
].join('\n');

const WORN_PROMPT = [
  'View: worn on the hand, front elevation of the hand and the piece.',
  'Piece: white gold engagement ring, six claw setting, single round brilliant, plain polished band.',
  'Source: the passed front and side views. The piece must match them exactly — same stone count, same setting count, same proportions.',
  'The hand and the pose must look like an ordinary catalog hand, not a portrait.',
  'Background: seamless and plain, as supplied by the retailer.',
  'No text, no watermark, no props.',
].join('\n');

const drawSettings = (seed: string) => [
  { label: 'Model', value: 'craftsman-render 3 · image' },
  { label: 'Seed', value: seed },
  { label: 'Steps', value: '38' },
  { label: 'Guidance', value: '7.0' },
];

const checkSettings = [
  { label: 'Reviewer', value: 'craftsman-vision 2' },
  { label: 'Pass threshold', value: '0.85' },
  { label: 'Compared', value: 'reference photograph against render' },
];

export const STEPS: LogStep[] = [
  {
    id: 'front-draw',
    view: 'Front',
    operation: 'draw',
    time: '09:14:07',
    summary: "Drawn from the retailer's front photograph.",
    status: 'produced',
    costsRender: true,
    artefact: 'front-v1.png',
    inputs: [photo('Front')],
    output: renderOutput('Front', 'front-v1.png', RENDER.frontV1, false),
    prompt: {
      label: 'Front draw',
      version: PINNED_VERSION,
      text: drawPrompt('Front', "the retailer's front photograph", 'straight on'),
      model: 'craftsman-render 3 · image',
      settings: drawSettings('481920'),
    },
  },
  {
    id: 'front-check',
    view: 'Front',
    operation: 'check',
    time: '09:14:21',
    summary: 'Stone count, setting count and band profile all matched.',
    status: 'passed',
    score: '0.91',
    costsRender: false,
    artefact: null,
    inputs: [photo('Front')],
    output: renderOutput('Front', 'front-v1.png', RENDER.frontV1, true),
    prompt: { label: 'Front check', version: PINNED_VERSION, text: checkPrompt('Front'), model: 'craftsman-vision 2', settings: checkSettings },
  },
  {
    id: 'side-draw',
    view: 'Side',
    operation: 'draw',
    time: '09:14:24',
    summary: "Drawn from the retailer's side photograph.",
    status: 'produced',
    costsRender: true,
    artefact: 'side-v1.png',
    inputs: [photo('Side')],
    output: renderOutput('Side', 'side-v1.png', RENDER.sideV1, false),
    prompt: {
      label: 'Side draw',
      version: PINNED_VERSION,
      text: drawPrompt('Side', "the retailer's side photograph", 'profile'),
      model: 'craftsman-render 3 · image',
      settings: drawSettings('481927'),
    },
  },
  {
    id: 'side-check-failed',
    view: 'Side',
    operation: 'check',
    time: '09:14:38',
    summary: 'Stone count did not match — five against six. Everything else on the piece matched.',
    status: 'failed',
    score: '0.71',
    costsRender: false,
    artefact: null,
    inputs: [photo('Side')],
    output: {
      ...renderOutput('Side', 'side-v1.png', RENDER.sideV1, true),
      caption: 'The render this check failed',
      failedCheck: 'Five stones counted where the reference shows six.',
    },
    prompt: { label: 'Side check', version: PINNED_VERSION, text: checkPrompt('Side'), model: 'craftsman-vision 2', settings: checkSettings },
  },
  {
    id: 'side-repair',
    view: 'Side',
    operation: 'repair',
    time: '09:14:41',
    summary: 'Regenerated with the mismatch described: five stones against six.',
    status: 'produced',
    costsRender: true,
    artefact: 'side-v2.png',
    inputs: [photo('Side')],
    output: renderOutput('Side', 'side-v2.png', RENDER.sideV2, false),
    prompt: {
      label: 'Side repair',
      version: PINNED_VERSION,
      text: REPAIR_PROMPT,
      model: 'craftsman-render 3 · image',
      settings: drawSettings('481933'),
    },
  },
  {
    id: 'side-recheck',
    view: 'Side',
    operation: 'recheck',
    time: '09:14:55',
    summary: 'Stone count, setting count and band profile all matched.',
    status: 'passed',
    score: '0.89',
    costsRender: false,
    artefact: null,
    inputs: [photo('Side')],
    output: renderOutput('Side', 'side-v2.png', RENDER.sideV2, true),
    prompt: { label: 'Side recheck', version: PINNED_VERSION, text: checkPrompt('Side'), model: 'craftsman-vision 2', settings: checkSettings },
  },
  {
    id: 'back-draw',
    view: 'Back',
    operation: 'draw',
    time: '09:14:58',
    summary: "Drawn from the retailer's back photograph.",
    status: 'produced',
    costsRender: true,
    artefact: 'back-v1.png',
    inputs: [photo('Back')],
    output: renderOutput('Back', 'back-v1.png', RENDER.backV1, false),
    prompt: {
      label: 'Back draw',
      version: PINNED_VERSION,
      text: drawPrompt('Back', "the retailer's back photograph", 'from behind'),
      model: 'craftsman-render 3 · image',
      settings: drawSettings('481940'),
    },
  },
  {
    id: 'back-check',
    view: 'Back',
    operation: 'check',
    time: '09:15:12',
    summary: 'Compared against the back photograph. Band profile and finish matched.',
    status: 'passed',
    score: '0.93',
    costsRender: false,
    artefact: null,
    inputs: [photo('Back')],
    output: renderOutput('Back', 'back-v1.png', RENDER.backV1, true),
    prompt: { label: 'Back check', version: PINNED_VERSION, text: checkPrompt('Back'), model: 'craftsman-vision 2', settings: checkSettings },
  },
  {
    id: 'worn-draw',
    view: 'Worn',
    operation: 'draw',
    time: '09:15:31',
    summary: 'Drawn from the passed front and side views.',
    status: 'produced',
    costsRender: true,
    artefact: 'worn-v1.png',
    inputs: [
      { ...photo('Front'), caption: 'The passed front view' },
      { ...photo('Side'), caption: 'The passed side view' },
    ],
    output: renderOutput('Worn', 'worn-v1.png', RENDER.wornV1, false),
    prompt: {
      label: 'Worn draw',
      version: PINNED_VERSION,
      text: WORN_PROMPT,
      model: 'craftsman-render 3 · image',
      settings: drawSettings('481948'),
    },
  },
  {
    id: 'worn-check',
    view: 'Worn',
    operation: 'check',
    time: '09:15:44',
    summary: 'The piece matched the front and side views.',
    status: 'passed',
    score: '0.88',
    costsRender: false,
    artefact: null,
    inputs: [photo('Front')],
    output: renderOutput('Worn', 'worn-v1.png', RENDER.wornV1, true),
    prompt: { label: 'Worn check', version: PINNED_VERSION, text: checkPrompt('Front'), model: 'craftsman-vision 2', settings: checkSettings },
  },
];

export const STEPS_TOTAL = STEPS.length;
export const RENDER_COUNT = STEPS.filter((step) => step.costsRender).length;
export const FREE_COUNT = STEPS_TOTAL - RENDER_COUNT;
export const REPAIR_PASSES = STEPS.filter((step) => step.operation === 'repair').length;

export const findStep = (id: string): LogStep | undefined => STEPS.find((step) => step.id === id);

export const operationLabels: Record<Operation, string> = {
  draw: 'draw',
  check: 'check',
  repair: 'repair',
  recheck: 'recheck',
};

export const statusLabels: Record<StepStatus, string> = {
  produced: 'Produced',
  passed: 'Passed',
  failed: 'Failed',
};