import type { NextPage } from 'next';
import { AuthGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../layout/DashboardSiteLayout';
import { SiteTenancy } from '../components/site-page/tenancy/SiteTenancy';

export const SitePage: NextPage = () => {
  return <SiteTenancy />;
};

SitePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
export default SitePage;
