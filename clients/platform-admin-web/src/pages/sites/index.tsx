import { PERMISSION_SET } from '@tymlez/common-libs';
import { SitePage } from '../../components/dashboard-site';
import { createProtectedPage } from '../../components/common/createProtectedPage';

export default createProtectedPage(
  <SitePage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
