import { PERMISSION_SET } from '@tymlez/common-libs';
import { SitePage } from '../../../components/guardian/site';
import { createProtectedPage } from '../../../components/common/createProtectedPage';
import { GuardianLayout } from '../../../components/guardian';

export default createProtectedPage(
  <GuardianLayout>
    <SitePage />
  </GuardianLayout>,
  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
