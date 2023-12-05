import { PERMISSION_SET } from '@tymlez/common-libs';
import { GuardianLayout } from '../../../components/guardian';
import { RootAuthorityPage } from '../../../components/guardian/root-authority';
import { createProtectedPage } from '../../../components/common/createProtectedPage';

export default createProtectedPage(
  <GuardianLayout>
    <RootAuthorityPage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
