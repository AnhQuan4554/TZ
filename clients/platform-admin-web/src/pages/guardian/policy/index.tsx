import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../../components/common/createProtectedPage';
import { GuardianLayout } from '../../../components/guardian';
import { PolicyPage } from '../../../components/guardian/policy';

export default createProtectedPage(
  <GuardianLayout>
    <PolicyPage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
