import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { MeterTasksPage } from '../../components/meter-tasks';

export default createProtectedPage(
  <MeterTasksPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
