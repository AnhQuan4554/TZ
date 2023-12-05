import { INrql } from '../interface/condition';
import { IWidget } from '../interface/dashboard';

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

export const showBillboardDashboard = (title: string, nrqlQueries: INrql[]): IWidget => {
  return {
    title,
    configuration: {
      billboard: {
        nrqlQueries,
      },
    },
    rawConfiguration: null,
  };
};