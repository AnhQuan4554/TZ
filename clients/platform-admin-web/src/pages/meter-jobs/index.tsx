import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { MeterJobsPage } from '../../components/meter-jobs';

export default createProtectedPage(
  <MeterJobsPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
