import { UUID } from '../data-type';
import { IDataFlow } from '../data-flow';

export interface IDataTask {
  id: UUID;
  dataFlow: IDataFlow;
  name: string;
  dependsOn?: IDataTask[];
  settings?: Record<string, any>;
  tags: string[];
}
