import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { DataTasksPage } from '../../components/data-tasks';

export default createProtectedPage(
  <DataTasksPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
