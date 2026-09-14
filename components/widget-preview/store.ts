'use client';

import { useSyncExternalStore } from 'react';
import type { WidgetStoreState } from './types';

const initialState: WidgetStoreState = {
  category: null,
  description: '',
  attachments: [],
  designMetal: 'yellow',
  moreOpen: false,
  themeSource: 'scraped',
  access: 'allowed',
  screenTwo: 'arrived',
  stageIndex: 12,
  live: false,
  failedAt: null,
  activeView: 'front',
  sizeValue: '',
  stone: null,
  budget: null,
  estimateOpen: false,
  estimateStep: 'form',
  estimateRunning: false,
  estimateOutcome: 'range',
  estimateCategory: null,
  requestOpen: false,
  requestStep: 'form',
  requestScenario: '',
  requestSending: false,
  requestError: false,
  requestErrorMessage: '',
  requestQuantity: '1',
  requestEstimate: null,
  requestName: '',
  requestEmail: '',
  requestPhone: '',
  requestAddress: '',
  requestMessage: '',
  allowanceExhausted: false,
  allowanceHasDesign: false,
  connection: 'live',
  secondInstance: false,
  previewScreen: null,
};

let state: WidgetStoreState = initialState;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function updateWidgetState(patch: Partial<WidgetStoreState>) {
  state = { ...state, ...patch };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

export function useWidgetState(): [
  WidgetStoreState,
  (patch: Partial<WidgetStoreState>) => void,
] {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return [snapshot, updateWidgetState];
}