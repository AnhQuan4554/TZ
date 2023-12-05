export interface IPolicy {
  policies: IPolicyDetail[];
}

export interface IPolicyDetail {
  id: number;
  incident_preference: string;
  name: string;
  created_at: number; //1653957608662;
  updated_at: number; //1653957608662;
}

export interface IConditionTerm {
  duration: number; //5 | 10 | 15 | 30 | 60 | 120; //minutes
  operator: string; // 'above' | 'below' | 'equals' | 'below_or_equals' | 'above_or_equals'|'not equals';
  priority: string; //'critical' | 'warning';
  threshold: number;
  time_function: string; //'all' | 'any';
}
export interface INrql {
  query: string;
  since_value?: number; //minutes between 1 and 20
  accountId?: number;
}

export interface INrqlConditionDetail {
  name: string;
  terms: IConditionTerm[];
  nrql: INrql;
  id?: number;
  entity_guid?: string;

  type?: string;
  enabled?: true;
  value_function?: string;
  violation_time_limit_seconds?: number;
  runbook_url?: string;
  signal?: {};
  expiration?: {
    close_violations_on_expiration: boolean;
    expiration_duration: number;
    open_violation_on_expiration: boolean;
  };
}

export interface ISyntheticConditionDetail {
  id: number;
  name: string;
  monitor_id: string;
  enabled: boolean;
}
