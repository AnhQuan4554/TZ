import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { DataFlowsPage } from '../../components/data-flows';

export default createProtectedPage(
  <DataFlowsPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
