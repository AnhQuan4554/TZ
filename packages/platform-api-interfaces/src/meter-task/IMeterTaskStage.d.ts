type ValueOf<T> = T[keyof T];

export type IMeterTaskStage =
  | 'collection'
  | 'transformation'
  | 'ingestion'
  | 'prepare'
  | 'validation'
  | 'submission';
