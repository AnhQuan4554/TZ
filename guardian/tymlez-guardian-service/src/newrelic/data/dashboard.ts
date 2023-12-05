import type { INrql } from '../interface/condition';
import type { IWidget } from '../interface/dashboard';

export const showDashboard = (title: string, nrqlQueries: INrql[]): IWidget => {
  return {
    title,
    configuration: {
      line: {
        nrqlQueries,
      },
    },
    rawConfiguration: null,
  };
};
