import { PERMISSION_SET } from '@tymlez/common-libs';
import { GuardianLayout } from '../../../components/guardian';
import { DevicePage } from '../../../components/guardian/device';
import { createProtectedPage } from '../../../components/common/createProtectedPage';

export default createProtectedPage(
  <GuardianLayout>
    <DevicePage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
