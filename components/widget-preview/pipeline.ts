import type {
  ScreenTwoState,
  ViewStatus,
  WidgetMetal,
  WidgetView,
} from './types';

export const VIEW_ORDER: WidgetView[] = ['front', 'side', 'back', 'worn'];

export const VIEW_LABEL: Record<WidgetView, string> = {
  front: 'Front',
  side: 'Side',
  back: 'Back',
  worn: 'Worn',
};

export const VIEW_IMAGES: Record<WidgetMetal, Record<WidgetView, string>> = {
  yellow: {
    front:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20seen%20from%20directly%20in%20front%2C%20a%20round%20brilliant%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-yellow-front-01&orientation=squarish',
    side:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20seen%20from%20the%20side%20in%20profile%2C%20the%20round%20brilliant%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20raised%20above%20a%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-yellow-side-02&orientation=squarish',
    back:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20six%20prong%20setting%20and%20the%20underside%20of%20the%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-yellow-back-03&orientation=squarish',
    worn:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20the%20same%20yellow%20gold%20solitaire%20ring%20worn%20on%20a%20finger%20of%20a%20hand%2C%20the%20hand%20shown%20upright%20against%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-yellow-worn-04&orientation=squarish',
  },
  white: {
    front:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20seen%20from%20directly%20in%20front%2C%20a%20round%20brilliant%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-white-front-01&orientation=squarish',
    side:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20seen%20from%20the%20side%20in%20profile%2C%20the%20round%20brilliant%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20raised%20above%20a%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-white-side-02&orientation=squarish',
    back:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20six%20prong%20setting%20and%20the%20underside%20of%20the%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-white-back-03&orientation=squarish',
    worn:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20the%20same%20white%20gold%20solitaire%20ring%20worn%20on%20a%20finger%20of%20a%20hand%2C%20the%20hand%20shown%20upright%20against%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-white-worn-04&orientation=squarish',
  },
  rose: {
    front:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20seen%20from%20directly%20in%20front%2C%20a%20round%20brilliant%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-rose-front-01&orientation=squarish',
    side:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20seen%20from%20the%20side%20in%20profile%2C%20the%20round%20brilliant%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20raised%20above%20a%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-rose-side-02&orientation=squarish',
    back:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20six%20prong%20setting%20and%20the%20underside%20of%20the%20softly%20tapered%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-rose-back-03&orientation=squarish',
    worn:
      'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20the%20same%20rose%20gold%20solitaire%20ring%20worn%20on%20a%20finger%20of%20a%20hand%2C%20the%20hand%20shown%20upright%20against%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition%2C%20consistent%20product%20photography%20style&width=720&height=720&seq=widget-view-rose-worn-04&orientation=squarish',
  },
};

export interface PipelineStage {
  view: WidgetView;
  label: string;
}

export const STAGES: PipelineStage[] = [
  { view: 'front', label: 'Drawing the front' },
  { view: 'front', label: 'Checking it' },
  { view: 'front', label: 'Correcting it' },
  { view: 'side', label: 'Drawing the side' },
  { view: 'side', label: 'Checking it' },
  { view: 'side', label: 'Correcting it' },
  { view: 'back', label: 'Drawing the back' },
  { view: 'back', label: 'Checking it' },
  { view: 'back', label: 'Correcting it' },
  { view: 'worn', label: 'Drawing the worn view' },
  { view: 'worn', label: 'Checking it' },
  { view: 'worn', label: 'Correcting it' },
];

export function stageLabelFor(stageIndex: number): string {
  const i = Math.max(0, Math.min(stageIndex, STAGES.length - 1));
  return STAGES[i].label;
}

export function viewStatus(
  view: WidgetView,
  screenTwo: ScreenTwoState,
  stageIndex: number,
  failedAt: WidgetView | null,
): ViewStatus {
  const vi = VIEW_ORDER.indexOf(view);

  if (screenTwo === 'failed') {
    const fi = failedAt ? VIEW_ORDER.indexOf(failedAt) : 0;
    if (vi < fi) return 'done';
    if (vi === fi) return 'failed';
    return 'skipped';
  }

  if (screenTwo === 'arrived' || stageIndex >= STAGES.length) return 'done';

  const si = Math.max(0, Math.min(stageIndex, STAGES.length - 1));
  const ci = VIEW_ORDER.indexOf(STAGES[si].view);

  if (vi < ci) return 'done';
  if (vi === ci) return 'active';
  return 'pending';
}

export function statusesFor(
  screenTwo: ScreenTwoState,
  stageIndex: number,
  failedAt: WidgetView | null,
): Record<WidgetView, ViewStatus> {
  return VIEW_ORDER.reduce(
    (acc, v) => {
      acc[v] = viewStatus(v, screenTwo, stageIndex, failedAt);
      return acc;
    },
    {} as Record<WidgetView, ViewStatus>,
  );
}