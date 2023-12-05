import { SafeNumber } from "../data-type";

export type IFindResult<T> = {
  count: SafeNumber;
  data: T[];
};
