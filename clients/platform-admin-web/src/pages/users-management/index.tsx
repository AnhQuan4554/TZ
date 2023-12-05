import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { UserManagementPage } from '../../components/users';

export default createProtectedPage(
  <UserManagementPage />,
  PERMISSION_SET.USER_MANAGEMENT,
);
