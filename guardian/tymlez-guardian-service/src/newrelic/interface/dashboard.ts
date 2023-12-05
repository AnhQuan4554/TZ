import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import type { INrql } from './condition';

export interface IDashboard {
  query: string;
  variables: {
    accountId: number;
    dashboard: {
      name: string;
      permissions: string;
      pages: IPage[];
    };
  };
}

export interface IPage {
  name: string;
  widgets: IWidget[];

  __typename?: string;
  createdAt?: IIsoDate;
  description?: null;
  guid?: string;

  owner?: IOwner;
  updatedAt?: IIsoDate;
}
export interface IWidget {
  id?: number;
  visualization?: string;
  layout?: number;
  title: string;
  linkedEntities?: [];
  configuration: { line: IConfiguration };
  rawConfiguration: null;
}

export interface IOwner {
  __typename: string;
  email: string;
  userId: number;
}

export interface IConfiguration {
  nrqlQueries: INrql[];
}

export interface IEntity {
  __typename: string;
  account: {
    __typename: string;
    id: number;
    name: string;
  };
  accountId: number;
  alertSeverity: null;
  dashboardParentGuid: null;
  domain: string;
  guid: string;
  name: string;
  owner: IOwner;
  permissions: string;
  reporting?: true;
  summaryMetrics?: null;
  type?: string;

  updatedAt?: IIsoDate;
  pages?: IPage[];
}
