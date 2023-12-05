import { UUID, IIsoDate } from '../data-type';
import { IMeter } from '../meter';

export interface IDataFlow {
  id: UUID;
  name: string;
  meter: IMeter;
  isPaused: boolean;
  startISODateTime: IIsoDate;
  endISODateTime?: IIsoDate;
  runISODateTime?: IIsoDate;
  runStatus?: 'running' | 'ready' | 'complete' | 'error';
  runError?: string;
  runDelayIntervals?: number;
  tags: string[];
}
