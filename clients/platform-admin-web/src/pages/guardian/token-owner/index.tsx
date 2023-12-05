import { PERMISSION_SET } from '@tymlez/common-libs';
import { TokenOwnerPage } from '../../../components/guardian/token-owner';
import { createProtectedPage } from '../../../components/common/createProtectedPage';
import { GuardianLayout } from '../../../components/guardian';

export default createProtectedPage(
  <GuardianLayout>
    <TokenOwnerPage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
