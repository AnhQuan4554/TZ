import { IMeter } from '../meter';
import { IMeterTask } from '../meter-task';
import { UUID, IIsoDate } from '../data-type';

export interface IMeterJob {
  id: UUID;
  meter: IMeter;
  name: string;
  type: string;
  isPaused: boolean;
  startISODateTime: IIsoDate;
  endISODateTime?: IIsoDate;
  currentTask?: IMeterTask;
  settings?: Record<string, any>;
  runSettings?: Record<string, any>;
  tags: string[];
}

export interface IMeterJobRunSettings {
  runDelayInSeconds?: number;
  maxFailedTasksAllowed?: number;
  maxRunningTasksAllowed?: number;
}
