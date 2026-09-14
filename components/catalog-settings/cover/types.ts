export interface CoverImage {
  id: string;
  url: string;
}

export type CoverState =
  | 'none'
  | 'oneLive'
  | 'fourSecondLive'
  | 'rejectedType'
  | 'rejectedSize'
  | 'rejectedWidth'
  | 'limitReached'
  | 'removingLive'
  | 'uploading'
  | 'uploadFailed';