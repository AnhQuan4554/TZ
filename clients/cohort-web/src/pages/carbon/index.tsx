import type { NextPage } from 'next';
import { AuthGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { SiteCarbon } from '../../components/site-page/carbon/SiteCarbon';

export const SitePage: NextPage = () => {
  return <SiteCarbon />;
};

SitePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
export default SitePage;
