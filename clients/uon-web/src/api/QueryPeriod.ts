import type { UseQueryResult } from 'react-query';
import type { HistoryQuery } from '@tymlez/frontend-libs';
import type { Dispatch, SetStateAction } from 'react';

export type IHookReturnWithPeriod<T> = UseQueryResult<T> & {
  query: HistoryQuery;
  setQuery: Dispatch<SetStateAction<HistoryQuery>>;
};
