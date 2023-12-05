import type { IIsoDate } from './IIsoDate';
import type { IMetricTon } from './IMetricTon';
import type { ITimeSpanMsec } from './ITimeSpanMsec';

export interface IMrvSetting {
  readingId?: string;
  CO2Emissions: IMetricTon;
  CH4Emissions: IMetricTon;
  N2OEmissions: IMetricTon;
  CO2eqEmissions: IMetricTon;
  emissionsUOM: string;
  intervalEndDateTime: IIsoDate;
  intervalStartDateTime: IIsoDate;
  intervalDuration: ITimeSpanMsec;
  intervalDurationUOM?: IMetricTon;
  CO2eqEmissionsReduction?: IMetricTon;
}
