import { PERMISSION_SET } from '@tymlez/common-libs';
import { ClientPage } from '../../components/client';
import { createProtectedPage } from '../../components/common/createProtectedPage';

export default createProtectedPage(
  <ClientPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
