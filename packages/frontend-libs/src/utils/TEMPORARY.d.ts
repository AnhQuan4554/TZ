import type { ISeriesItem, ICarbonSeries } from '../../../platform-api-interfaces'

export interface IDashboardBlockSummary {
  title: string
  value: string
  percentageChange: number
  percentageDuration: string
  data?: IPoint[]
}

export interface ISiteData {
  title: string
  data: IData[]
}

export interface ISiteCarbonData {
  title: string
  data: ICarbonSeries
}

export interface IData {
  name: string
  data: ISeriesItem[]
}
export interface IPoint {
  x: number | Date
  y: number
}

export interface ChartSeries {
  name: string
  type?: string
  data: IPoint[]
  color: string
}

export interface ICarbonReport {
  abated: ICarbonField
  produced: ICarbonField
  penetration: ICarbonField
  data: ICarbonData[]
}

export interface ICarbonData {
  timestamp: ITimestampMsec
  abated: number
  produced: number
}

export interface ICarbonField {
  title: string
  description: string
  subTitle: string
  data: number
}

export interface ICarbonAudit {
  source: string
  measurement: number
  units: string
  carbon: number
  auditLink: string
}
