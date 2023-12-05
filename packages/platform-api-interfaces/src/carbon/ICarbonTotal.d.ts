import { SafeNumber } from '../data-type/SafeNumber';

export interface ICarbonTotal {
  emission: SafeNumber;
  abatement: SafeNumber;
  net: SafeNumber;
}
