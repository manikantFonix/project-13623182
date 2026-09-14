import type { CoverImage, CoverState } from './types';

export type { CoverImage, CoverState } from './types';

const C1 =
  'https://readdy.ai/api/search-image?query=Wide%20banner%20photograph%20of%20an%20elegant%20collection%20of%20fine%20gold%20and%20rose%20gold%20jewellery%20rings%20necklaces%20and%20bracelets%20arranged%20on%20soft%20ivory%20silk%20gentle%20diffused%20studio%20light%20luxury%20minimalist%20styling%20clean%20neutral%20background%20ultra%20detailed%20professional%20product%20photography%20no%20text&width=1600&height=1067&seq=cover-ivory-a&orientation=landscape';

const C2 =
  'https://readdy.ai/api/search-image?query=Wide%20banner%20photograph%20of%20polished%20yellow%20gold%20rings%20lined%20up%20across%20a%20pale%20cream%20silk%20surface%20soft%20diffused%20studio%20lighting%20subtle%20shadows%20luxury%20jewellery%20editorial%20styling%20clean%20minimal%20neutral%20background%20ultra%20detailed%20professional%20product%20photography%20no%20text&width=1600&height=1067&seq=cover-cream-b&orientation=landscape';

const C3 =
  'https://readdy.ai/api/search-image?query=Wide%20banner%20photograph%20of%20delicate%20rose%20gold%20necklaces%20and%20pendants%20gracefully%20draped%20over%20a%20soft%20ivory%20linen%20surface%20gentle%20diffused%20studio%20light%20elegant%20luxury%20styling%20clean%20minimal%20warm%20neutral%20background%20ultra%20detailed%20professional%20product%20photography%20no%20text&width=1600&height=1067&seq=cover-linen-c&orientation=landscape';

const C4 =
  'https://readdy.ai/api/search-image?query=Wide%20banner%20photograph%20of%20diamond%20engagement%20rings%20in%20yellow%20gold%20and%20rose%20gold%20arranged%20on%20smooth%20ivory%20silk%20under%20soft%20diffused%20studio%20lighting%20luxury%20bridal%20jewellery%20editorial%20styling%20clean%20neutral%20background%20ultra%20detailed%20professional%20product%20photography%20no%20text&width=1600&height=1067&seq=cover-bridal-d&orientation=landscape';

export const COVER_STATES: CoverState[] = [
  'none',
  'oneLive',
  'fourSecondLive',
  'rejectedType',
  'rejectedSize',
  'rejectedWidth',
  'limitReached',
  'removingLive',
  'uploading',
  'uploadFailed',
];

export const coverLabel: Record<CoverState, string> = {
  none: 'No images',
  oneLive: 'One live',
  fourSecondLive: 'Four · 2nd live',
  rejectedType: 'Bad type',
  rejectedSize: 'Too big',
  rejectedWidth: 'Too narrow',
  limitReached: 'At four',
  removingLive: 'Remove live',
  uploading: 'Uploading',
  uploadFailed: 'Upload failed',
};

const TYPE_MSG = "That file type isn't supported. Use a JPEG or a PNG.";
const SIZE_MSG = 'That file is 8.2 MB. The limit is 5 MB.';
const WIDTH_MSG =
  "That image is 900px wide. It needs at least 1600px, or it'll look soft across the top of your catalog.";

export interface CoverDemo {
  images: CoverImage[];
  liveId: string | null;
  refusal: string | null;
  uploading: boolean;
  error: boolean;
  confirmLiveId: string | null;
}

const EMPTY: CoverDemo = {
  images: [],
  liveId: null,
  refusal: null,
  uploading: false,
  error: false,
  confirmLiveId: null,
};

const ONE: CoverImage[] = [{ id: 'c1', url: C1 }];
const FOUR: CoverImage[] = [
  { id: 'c1', url: C1 },
  { id: 'c2', url: C2 },
  { id: 'c3', url: C3 },
  { id: 'c4', url: C4 },
];

export function buildCoverDemo(state: CoverState): CoverDemo {
  switch (state) {
    case 'oneLive':
      return { ...EMPTY, images: ONE, liveId: 'c1' };
    case 'fourSecondLive':
      return { ...EMPTY, images: FOUR, liveId: 'c2' };
    case 'limitReached':
      return { ...EMPTY, images: FOUR, liveId: 'c2' };
    case 'rejectedType':
      return { ...EMPTY, refusal: TYPE_MSG };
    case 'rejectedSize':
      return { ...EMPTY, refusal: SIZE_MSG };
    case 'rejectedWidth':
      return { ...EMPTY, refusal: WIDTH_MSG };
    case 'removingLive':
      return { ...EMPTY, images: ONE, liveId: 'c1', confirmLiveId: 'c1' };
    case 'uploading':
      return { ...EMPTY, images: ONE, liveId: 'c1', uploading: true };
    case 'uploadFailed':
      return { ...EMPTY, images: ONE, liveId: 'c1', error: true };
    default:
      return EMPTY;
  }
}