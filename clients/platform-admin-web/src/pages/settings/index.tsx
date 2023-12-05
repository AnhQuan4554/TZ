import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { SettingPage } from '../../components/settings';

export default createProtectedPage(
  <SettingPage />,
  PERMISSION_SET.CONFIG_MANAGEMENT,
);
