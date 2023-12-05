export interface IMonitor {
  account: { __typename: 'AccountOutline'; id: number; name: string };
  accountId: number;
  alertSeverity: 'NOT_CONFIGURED';
  domain: 'SYNTH';
  guid: string;
  name: string;
  reporting: true;
  tags?: [{ __typename: 'EntityTag'; key: 'account'; values: string[] }];
  type: 'MONITOR';
  __typename: 'SyntheticMonitorEntityOutline';
  summaryMetrics: ISummaryMetric[];
}

export interface ISummaryMetric {
  __typename: string;
  name: string;
  title: string;
  value: {
    __typename: string;
    stringValue: string;
    unit: string;
  };
}

export interface IMonitorList {
  entities: IMonitorEntity[];
  total: number;
}

export interface IMonitorEntity {
  id: string;
  locations: ['AWS_AP_SOUTHEAST_2'];
  name: string;
}
