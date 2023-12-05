import { PERMISSION_SET } from '@tymlez/common-libs';
import { ProjectPage } from '../../../components/guardian/project';
import { createProtectedPage } from '../../../components/common/createProtectedPage';
import { GuardianLayout } from '../../../components/guardian';

export default createProtectedPage(
  <GuardianLayout>
    <ProjectPage />
  </GuardianLayout>,

  PERMISSION_SET.GUARDIAN_MANAGEMENT,
);
