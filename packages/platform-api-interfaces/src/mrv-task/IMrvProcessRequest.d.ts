import { IIsoDate } from '../data-type/IIsoDate';

export type IMrvProcessRequest = {
  taskId?: number;
  isoDateTime: IIsoDate;
  meterKey?: string;
  jobId?: string;
};

export type IMrvStateResponse = {
  markAsDone: boolean;
};
