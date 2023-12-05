export interface ICircuitMapRecord {
  label: string;
  meterId: string;
  isMain: boolean;
  indexes: number[];
}
export interface ICircuitMap {
  circuits: ICircuitMapRecord[];
}

export interface IMeterInfoService {
  getCircuitMapBySite(siteName: string): Promise<ICircuitMap>;
}
