'use client';

import { NEUTRAL_THEME, SCRAPED_THEME, themeStyle } from './theme';
import { useWidgetState } from './store';
import WidgetBlocked from './WidgetBlocked';
import WidgetMount from './WidgetMount';
import WidgetScreenOne from './WidgetScreenOne';
import WidgetDesignScreen from './WidgetDesignScreen';
import WidgetPreviewControl from './WidgetPreviewControl';
import {
  ACCESS_GROUP,
  ALLOWANCE_GROUP,
  CONNECTION_GROUP,
  ESTIMATE_GROUP,
  PIPELINE_GROUP,
  REQUEST_GROUP,
  SAMPLE_DESC,
  SAMPLE_REQUEST_ESTIMATE,
  SCREEN_ONE_GROUP,
  SCREEN_TWO_GROUP,
  SECOND_INSTANCE_GROUP,
  THEME_GROUP,
  type PreviewGroup,
} from './data';

export type WidgetScreen = 'one' | 'two' | 'estimate' | 'request';

export default function WidgetPreviewRoute({ screen }: { screen: WidgetScreen }) {
  const [state, update] = useWidgetState();
  const theme = state.themeSource === 'scraped' ? SCRAPED_THEME : NEUTRAL_THEME;
  const blocked = state.access === 'blocked';

  const groups: PreviewGroup[] =
    screen === 'one'
      ? [SCREEN_ONE_GROUP, ALLOWANCE_GROUP, SECOND_INSTANCE_GROUP, THEME_GROUP, ACCESS_GROUP]
      : screen === 'two'
        ? [SCREEN_TWO_GROUP, PIPELINE_GROUP, CONNECTION_GROUP, ALLOWANCE_GROUP, SECOND_INSTANCE_GROUP, THEME_GROUP, ACCESS_GROUP]
        : screen === 'estimate'
          ? [ESTIMATE_GROUP, ALLOWANCE_GROUP, THEME_GROUP, ACCESS_GROUP]
          : [REQUEST_GROUP, ALLOWANCE_GROUP, THEME_GROUP, ACCESS_GROUP];

  const pipelineIndex = (value: string): number | null => {
    const m = /^s2-stage-(\d+)$/.exec(value);
    return m ? Number(m[1]) : null;
  };

  const answered =
    state.sizeValue.trim() !== '' && !!state.stone && state.budget !== null;

  const formStep =
    state.estimateOpen && state.estimateStep === 'form';

  const isActive = (value: string): boolean => {
    const pi = pipelineIndex(value);
    if (pi !== null) {
      return (
        state.screenTwo === 'generating' &&
        !state.live &&
        state.stageIndex === pi
      );
    }
    switch (value) {
      case 's1-nothing':
        return state.category === null && !state.moreOpen;
      case 's1-category':
        return state.category !== null && state.description.trim() === '';
      case 's1-ready':
        return state.category !== null && state.description.trim() !== '';
      case 's1-more':
        return state.moreOpen;
      case 's2-live':
        return state.screenTwo === 'generating' && state.live;
      case 's2-front-done':
        return (
          state.screenTwo === 'generating' &&
          !state.live &&
          state.stageIndex === 3
        );
      case 's2-fail-side':
        return state.screenTwo === 'failed' && state.failedAt === 'side';
      case 's2-arrived':
        return state.screenTwo === 'arrived' && !state.estimateOpen;
      case 'est-closed':
        return state.screenTwo === 'arrived' && !state.estimateOpen;
      case 'est-empty':
        return (
          formStep &&
          state.sizeValue === '' &&
          !state.stone &&
          state.budget === null
        );
      case 'est-part':
        return (
          formStep &&
          state.sizeValue !== '' &&
          !state.stone &&
          state.budget === null
        );
      case 'est-ready':
        return formStep && state.category === 'earring' && answered;
      case 'est-ring':
        return formStep && state.category === 'ring' && answered;
      case 'est-pendant':
        return formStep && state.category === 'pendant' && answered;
      case 'est-generic':
        return formStep && state.category === 'grillz' && answered;
      case 'est-calculating':
        return state.estimateOpen && state.estimateStep === 'calculating';
      case 'est-normal':
        return (
          state.estimateOpen &&
          state.estimateStep === 'result' &&
          state.estimateOutcome === 'range'
        );
      case 'est-over':
        return (
          state.estimateOpen &&
          state.estimateStep === 'result' &&
          state.estimateOutcome === 'over'
        );
      case 'est-failed':
        return (
          state.estimateOpen &&
          state.estimateStep === 'result' &&
          state.estimateOutcome === 'failed'
        );
      case 'req-closed':
      case 'req-with-estimate':
      case 'req-no-estimate':
      case 'req-empty':
      case 'req-invalid-email':
      case 'req-min-qty':
      case 'req-sending':
      case 'req-failed':
      case 'req-confirmation':
        return state.requestScenario === value;
      case 'theme-scraped':
        return state.themeSource === 'scraped';
      case 'theme-neutral':
        return state.themeSource === 'neutral';
      case 'access-allowed':
        return state.access === 'allowed';
      case 'access-blocked':
        return state.access === 'blocked';
      case 'allow-none':
        return state.allowanceExhausted && !state.allowanceHasDesign;
      case 'allow-design':
        return state.allowanceExhausted && state.allowanceHasDesign;
      case 'reconnecting':
        return state.connection === 'reconnecting';
      case 'second-instance':
        return state.secondInstance;
      default:
        return false;
    }
  };

  const onSelect = (value: string) => {
    const keepMode =
      value.startsWith('theme-') || value.startsWith('access-');
    if (!keepMode) {
      update({
        allowanceExhausted: false,
        allowanceHasDesign: false,
        connection: 'live',
        secondInstance: false,
        previewScreen: null,
      });
    }
    const pi = pipelineIndex(value);
    if (pi !== null) {
      return update({
        screenTwo: 'generating',
        stageIndex: pi,
        live: false,
        failedAt: null,
      });
    }
    switch (value) {
      case 's1-nothing':
        return update({ category: null, description: '', moreOpen: false });
      case 's1-category':
        return update({ category: 'ring', description: '', moreOpen: false });
      case 's1-ready':
        return update({
          category: 'ring',
          description: SAMPLE_DESC,
          moreOpen: false,
        });
      case 's1-more':
        return update({ moreOpen: true });
      case 's2-live':
        return update({
          screenTwo: 'generating',
          stageIndex: 0,
          live: true,
          failedAt: null,
        });
      case 's2-front-done':
        return update({
          screenTwo: 'generating',
          stageIndex: 3,
          live: false,
          failedAt: null,
        });
      case 's2-fail-side':
        return update({
          screenTwo: 'failed',
          live: false,
          failedAt: 'side',
        });
      case 's2-arrived':
        return update({
          screenTwo: 'arrived',
          stageIndex: 12,
          live: false,
          failedAt: null,
          estimateOpen: false,
        });
      case 'est-closed':
        return update({
          screenTwo: 'arrived',
          stageIndex: 12,
          live: false,
          failedAt: null,
          estimateOpen: false,
          estimateStep: 'form',
        });
      case 'est-empty':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'form',
          estimateRunning: false,
          sizeValue: '',
          stone: null,
          budget: null,
        });
      case 'est-part':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'form',
          estimateRunning: false,
          sizeValue: '7',
          stone: null,
          budget: null,
        });
      case 'est-ready':
        return update({
          screenTwo: 'arrived',
          category: 'earring',
          estimateCategory: 'earring',
          estimateOpen: true,
          estimateStep: 'form',
          estimateRunning: false,
          sizeValue: '25',
          stone: 'lab-grown',
          budget: 1600,
        });
      case 'est-ring':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'form',
          estimateRunning: false,
          sizeValue: '7',
          stone: 'natural',
          budget: 3000,
        });
      case 'est-pendant':
        return update({
          screenTwo: 'arrived',
          category: 'pendant',
          estimateCategory: 'pendant',
          estimateOpen: true,
          estimateStep: 'form',
          estimateRunning: false,
          sizeValue: '18',
          stone: 'natural',
          budget: 1800,
        });
      case 'est-generic':
        return update({
          screenTwo: 'arrived',
          category: 'grillz',
          estimateCategory: 'grillz',
          estimateOpen: true,
          estimateStep: 'form',
          estimateRunning: false,
          sizeValue: '12',
          stone: 'lab-grown',
          budget: 2200,
        });
      case 'est-calculating':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'calculating',
          estimateRunning: false,
          sizeValue: '7',
          stone: 'natural',
          budget: 3000,
        });
      case 'est-normal':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'result',
          estimateRunning: false,
          sizeValue: '7',
          stone: 'natural',
          budget: 3000,
          estimateOutcome: 'range',
        });
      case 'est-over':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'result',
          estimateRunning: false,
          sizeValue: '8',
          stone: 'natural',
          budget: 400,
          estimateOutcome: 'over',
        });
      case 'est-failed':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateCategory: 'ring',
          estimateOpen: true,
          estimateStep: 'result',
          estimateRunning: false,
          sizeValue: '7',
          stone: null,
          budget: null,
          estimateOutcome: 'failed',
        });
      case 'req-closed':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          estimateOpen: false,
          requestOpen: false,
          requestScenario: 'req-closed',
        });
      case 'req-with-estimate':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: false,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestQuantity: '1',
          requestScenario: 'req-with-estimate',
        });
      case 'req-no-estimate':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: false,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: null,
          requestQuantity: '1',
          requestName: 'Sam Rivera',
          requestEmail: 'sam.rivera@example.com',
          requestPhone: '+1 555 0134',
          requestScenario: 'req-no-estimate',
        });
      case 'req-empty':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: false,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestQuantity: '1',
          requestName: '',
          requestEmail: '',
          requestPhone: '',
          requestAddress: '',
          requestMessage: '',
          requestScenario: 'req-empty',
        });
      case 'req-invalid-email':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: false,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestQuantity: '1',
          requestName: 'Sam Rivera',
          requestEmail: 'sam.rivera@',
          requestPhone: '+1 555 0134',
          requestScenario: 'req-invalid-email',
        });
      case 'req-min-qty':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: false,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestQuantity: '1',
          requestName: 'Sam Rivera',
          requestEmail: 'sam.rivera@example.com',
          requestPhone: '+1 555 0134',
          requestScenario: 'req-min-qty',
        });
      case 'req-sending':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: true,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestQuantity: '1',
          requestName: 'Sam Rivera',
          requestEmail: 'sam.rivera@example.com',
          requestPhone: '+1 555 0134',
          requestScenario: 'req-sending',
        });
      case 'req-failed':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'form',
          requestSending: false,
          requestError: true,
          requestErrorMessage:
            "We couldn't send that. Nothing has been sent \u2014 try again.",
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestQuantity: '1',
          requestName: 'Sam Rivera',
          requestEmail: 'sam.rivera@example.com',
          requestPhone: '+1 555 0134',
          requestScenario: 'req-failed',
        });
      case 'req-confirmation':
        return update({
          screenTwo: 'arrived',
          category: 'ring',
          requestOpen: true,
          requestStep: 'confirmation',
          requestSending: false,
          requestError: false,
          requestErrorMessage: '',
          requestEstimate: SAMPLE_REQUEST_ESTIMATE,
          requestScenario: 'req-confirmation',
        });
      case 'theme-scraped':
        return update({ themeSource: 'scraped' });
      case 'theme-neutral':
        return update({ themeSource: 'neutral' });
      case 'access-allowed':
        return update({ access: 'allowed' });
      case 'access-blocked':
        return update({ access: 'blocked' });
      case 'allow-none':
        return update({
          previewScreen: 'one',
          allowanceExhausted: true,
          allowanceHasDesign: false,
          category: null,
          description: '',
          moreOpen: false,
          screenTwo: 'arrived',
          stageIndex: 12,
          live: false,
          failedAt: null,
          estimateOpen: false,
          requestOpen: false,
        });
      case 'allow-design':
        return update({
          previewScreen: 'two',
          allowanceExhausted: true,
          allowanceHasDesign: true,
          category: 'ring',
          description: SAMPLE_DESC,
          screenTwo: 'arrived',
          stageIndex: 12,
          live: false,
          failedAt: null,
          estimateOpen: false,
          requestOpen: false,
        });
      case 'reconnecting':
        return update({
          previewScreen: 'two',
          connection: 'reconnecting',
          category: 'ring',
          description: SAMPLE_DESC,
          screenTwo: 'generating',
          stageIndex: 6,
          live: false,
          failedAt: null,
          estimateOpen: false,
          requestOpen: false,
        });
      case 'second-instance':
        return update({ secondInstance: true });
      default:
        return undefined;
    }
  };

  const activeScreen: WidgetScreen = state.previewScreen ?? screen;

  const renderScreen = () => {
    if (activeScreen === 'one') return <WidgetScreenOne token="preview" />;
    if (activeScreen === 'two') return <WidgetDesignScreen token="preview" />;
    if (activeScreen === 'estimate')
      return <WidgetDesignScreen token="preview" openEstimateOnMount />;
    return <WidgetDesignScreen token="preview" openRequestOnMount />;
  };

  return (
    <div className="min-h-screen bg-[#F1F3F9]">
      {!blocked && (
        <div style={themeStyle(theme)} className="w-full flex justify-center">
          <div
            className={
              state.secondInstance
                ? 'w-full max-w-[1180px] px-6 py-6'
                : 'w-full max-w-[640px] px-6 py-6'
            }
          >
            {state.secondInstance ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <WidgetMount>
                  <WidgetScreenOne token="preview" />
                </WidgetMount>
                <WidgetMount>
                  <WidgetScreenOne token="preview" />
                </WidgetMount>
              </div>
            ) : (
              <WidgetMount>{renderScreen()}</WidgetMount>
            )}
          </div>
        </div>
      )}
      {blocked && <WidgetBlocked />}
      <WidgetPreviewControl groups={groups} isActive={isActive} onSelect={onSelect} />
    </div>
  );
}