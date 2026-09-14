export type WidgetThemeSource = 'scraped' | 'neutral';

export interface WidgetTheme {
  source: WidgetThemeSource;
  primary: string;
  primaryText: string;
  surface: string;
  text: string;
  secondaryText: string;
  border: string;
  radius: number;
  fontFamily: string;
}

export interface WidgetAttachment {
  id: string;
  name: string;
  url: string;
}

export type WidgetView = 'front' | 'side' | 'back' | 'worn';

export type WidgetMetal = 'yellow' | 'white' | 'rose';

export type EstimateStone = 'natural' | 'lab-grown';

export type EstimateOutcome = 'range' | 'over' | 'failed';

export type EstimateStep = 'form' | 'calculating' | 'result';

export type RequestStep = 'form' | 'confirmation';

export interface EstimateInput {
  category: string;
  size: string;
  metal: WidgetMetal;
  stone: EstimateStone | null;
  budget: number | null;
}

export interface EstimateResult {
  metal: number;
  stones: number;
  labor: number;
  low: number;
  high: number;
}

export type ViewStatus = 'pending' | 'active' | 'done' | 'failed' | 'skipped';

export type ScreenTwoState = 'generating' | 'arrived' | 'failed';

export type AccessState = 'allowed' | 'blocked';

export type WidgetPreviewScreen = 'one' | 'two' | 'estimate' | 'request';

export type WidgetConnection = 'live' | 'reconnecting';

export interface WidgetContact {
  phone: string | null;
  email: string | null;
}

export interface WidgetStoreState {
  category: string | null;
  description: string;
  attachments: WidgetAttachment[];
  designMetal: WidgetMetal;
  moreOpen: boolean;
  themeSource: WidgetThemeSource;
  access: AccessState;
  screenTwo: ScreenTwoState;
  stageIndex: number;
  live: boolean;
  failedAt: WidgetView | null;
  activeView: WidgetView;
  sizeValue: string;
  stone: EstimateStone | null;
  budget: number | null;
  estimateOpen: boolean;
  estimateStep: EstimateStep;
  estimateRunning: boolean;
  estimateOutcome: EstimateOutcome;
  estimateCategory: string | null;
  requestOpen: boolean;
  requestStep: RequestStep;
  requestScenario: string;
  requestSending: boolean;
  requestError: boolean;
  requestErrorMessage: string;
  requestQuantity: string;
  requestEstimate: EstimateResult | null;
  requestName: string;
  requestEmail: string;
  requestPhone: string;
  requestAddress: string;
  requestMessage: string;
  allowanceExhausted: boolean;
  allowanceHasDesign: boolean;
  connection: WidgetConnection;
  secondInstance: boolean;
  previewScreen: WidgetPreviewScreen | null;
}