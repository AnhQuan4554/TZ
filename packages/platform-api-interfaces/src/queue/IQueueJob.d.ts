import type { SafeNumber } from '../data-type';

export interface IQueueData {
  total: number;
  jobs: IQueueJob[];
}

export interface IQueueJob {
  id: string;
  timestamp: string;
  processedOn: string;
  name: string;
  delay: SafeNumber;
  data: string;
}
