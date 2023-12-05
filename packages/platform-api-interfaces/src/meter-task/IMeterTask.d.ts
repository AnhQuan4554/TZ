import { IIsoDate, SafeNumber } from '../data-type';
import { IMeterJob } from '../meter-job';
import { IMeter } from '../meter';
import { ISite } from '../dashboard-site';
import { IMeterTaskStatus } from './IMeterTaskStatus';
import { IMeterTaskStage } from './IMeterTaskStage';

export interface IMeterTask {
  id: SafeNumber;
  site: ISite;
  meter: IMeter;
  meterJob: IMeterJob;
  stage: IMeterTaskStage | MvrTaskState;
  isoDateTime: IIsoDate;
  status: IMeterTaskStatus;
  retries?: SafeNumber;
  error?: string;
  updatedAt?: Date;
}
