import { PERMISSION_SET } from '@tymlez/common-libs';
import { UserPermissionPage } from 'src/components/user-role';
import { createProtectedPage } from '../../components/common/createProtectedPage';

export default createProtectedPage(
  <UserPermissionPage />,
  PERMISSION_SET.USER_MANAGEMENT,
);
