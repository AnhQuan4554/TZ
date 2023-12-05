export interface IImport {
  item: T;
  id: string | UUID;
  ref: string;
  type: string;
  status: boolean; //true if not existing in database
}
