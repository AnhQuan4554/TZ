import type { NextPage } from 'next';
import { AuthGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { SiteVerification } from '../../components/site-page/verification/SiteVerification';

export const SitePage: NextPage = () => {
  return <SiteVerification />;
};

SitePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
export default SitePage;
