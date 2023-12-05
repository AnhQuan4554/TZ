import type { IMeter } from '../meter';
import type { ISafeDate } from '../data-type';

export interface ITenancy {
  id: string;
  name: string;
  meter: IMeter;
  visible: boolean;
  createdAt: ISafeDate;
  updatedAt: ISafeDate;
  tags: string[];
}
