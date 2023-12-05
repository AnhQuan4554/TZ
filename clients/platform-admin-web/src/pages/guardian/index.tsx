import { PERMISSION_SET } from '@tymlez/common-libs';
import { createProtectedPage } from '../../components/common/createProtectedPage';
import { GuardianLayout } from '../../components/guardian';
import { OverviewPage } from '../../components/guardian/overview';

export default createProtectedPage(
  <GuardianLayout>
    <OverviewPage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
