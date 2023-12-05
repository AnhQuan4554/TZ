import type { SafeNumber } from '../data-type';

export type IPanelWarning =
  | 'NO WARNINGS'
  | 'TEMPERATURE NOT OPTIMAL'
  | 'PANELS OFFLINE'
  | 'OFFLINE';

export type IGenerationLevel = 'High' | 'Medium' | 'Low' | 'N/A';

export interface IPanelGroup {
  name: string;
  ids: string;
  warning: IPanelWarning;
  generation: SafeNumber;
  level: IGenerationLevel;
  brokenPanels: SafeNumber;
  generationRatio: SafeNumber;
  activePanels: SafeNumber;
}

export interface IPanelGroupVerification {
  records: Array<IPanelGroup>;
  num: SafeNumber;
}
