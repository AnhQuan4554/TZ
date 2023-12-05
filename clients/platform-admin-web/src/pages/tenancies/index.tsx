import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { TenancyPage } from '../../components/tenancy';

export default createProtectedPage(
  <TenancyPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
