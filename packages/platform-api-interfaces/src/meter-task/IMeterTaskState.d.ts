import type { IIsoDate, SafeNumber } from '../data-type';
import type { IMeterTaskStage } from './IMeterTaskStage';
import type { IMeterTaskStatus } from './IMeterTaskStatus';

export interface IMeterTaskState {
  stage: IMeterTaskStage;
  status: IMeterTaskStatus;
  retries: SafeNumber;
  error?: string;
}

export type IMeterTaskStateEvent =
  | 'start'
  | 'complete'
  | 'error'
  | 'retry'
  | 'queue'
  | 'finish';
