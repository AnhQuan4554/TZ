import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { MeterDataPage } from '../../components/meter-data';

export default createProtectedPage(
  <MeterDataPage />,
  PERMISSION_SET.DATA_MANAGEMENT,
);
