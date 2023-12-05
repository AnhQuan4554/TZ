import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { MeterPage } from '../../components/meter';

export default createProtectedPage(
  <MeterPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
