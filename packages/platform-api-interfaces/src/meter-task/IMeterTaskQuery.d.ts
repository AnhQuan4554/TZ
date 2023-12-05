import { IMeterTaskStatus } from './IMeterTaskStatus';

export type IMeterTaskQuery = {
  startDateTime: string;
  endDateTime: string;
  status: IMeterTaskStatus;
  meterJobId: string;
};
