import type { NextPage } from 'next';
import { AuthGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { SiteConsumptionGeneration } from '../../components/site-page/consumption&generation/SiteConsumptionGeneration';

export const SitePage: NextPage = () => {
  return <SiteConsumptionGeneration />;
};

SitePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
export default SitePage;
