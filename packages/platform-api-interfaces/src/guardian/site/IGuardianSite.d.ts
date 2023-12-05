import type { ILatitude, ILongitude } from '../data-type';
import type { UUID } from '../UUID';

export interface IGuardianSite {
  id: UUID;
  name: string;
  lat: ILatitude;
  lng: ILongitude;
  isPublished: boolean;
}
