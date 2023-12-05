import { PERMISSION_SET } from '@tymlez/common-libs';
import { InstallerPage } from '../../../components/guardian/installer';
import { createProtectedPage } from '../../../components/common/createProtectedPage';
import { GuardianLayout } from '../../../components/guardian';

export default createProtectedPage(
  <GuardianLayout>
    <InstallerPage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
