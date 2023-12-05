import type { IIsoDate } from '@tymlez/platform-api-interfaces';

export interface IDestination {
  accountId: number;
  active: boolean;
  auth: {
    authType: string;
    prefix: string;
    __typename: 'AiNotificationsTokenAuth';
  } | null;
  createdAt: IIsoDate;
  id: string;
  isUserAuthenticated: boolean;
  name: string;
  properties: IDetail[];
  status: string;
  type: string;
  updatedAt: IIsoDate;
  updatedBy: number; //accountId
  __typename: 'AiNotificationsDestination';
}

export interface IDetail {
  key: string;
  value: string;
  __typename: 'AiNotificationsProperty';
  displayValue?: string;
  label?: string;
}

export interface IWorkflow {
  accountId: number;
  createdAt: IIsoDate;
  destinationConfigurations: [
    {
      channelId: string;
      name: string;
      type: string;
      __typename: 'AiWorkflowsDestinationConfiguration';
    },
  ];
  destinationsEnabled: boolean;
  enrichments: [];
  enrichmentsEnabled: boolean;
  id: string;
  issuesFilter: {
    accountId: number;
    id: string;
    name: string;
    predicates: [
      {
        __typename: 'AiWorkflowsPredicate';
        attribute: 'labels.policyIds';
        operator: 'EXACTLY_MATCHES';
        values: string[];
      },
    ];
    type: 'FILTER';
    __typename: 'AiWorkflowsFilter';
  };
  lastRun: null;
  mutingRulesHandling: 'DONT_NOTIFY_FULLY_MUTED_ISSUES';
  name: string;
  updatedAt: IIsoDate;
  workflowEnabled: boolean;
  __typename: 'AiWorkflowsWorkflow';
}

export interface IChannel {
  active: boolean;
  createdAt: IIsoDate;
  destinationId: string;
  id: string;
  name: string;
  status: 'DEFAULT';
  type: string;
  updatedAt: IIsoDate;
  __typename: 'AiNotificationsChannel';
  accountId?: number;
  product?: 'IINT';
  properties?: IDetail[];
  updatedBy?: number;
}

export interface IDestinationInput {
  name: string;
  properties: [{ key: string; value: string }];
  type: string;
}
