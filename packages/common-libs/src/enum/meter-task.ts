export enum EnumMeterTaskStatus {
  All = 'all',
  Queued = 'queued',
  Pending = 'pending',
  Running = 'running',
  Success = 'success',
  Error = 'error',
  Active = 'active',
}

export enum EnumMeterTaskStage {
  Collection = 'collection',
  Transformation = 'transformation',
  Ingestion = 'ingestion',
}
export enum MvrTaskState {
  Prepare = 'prepare',
  Validation = 'validation',
  Submission = 'submission',
}
