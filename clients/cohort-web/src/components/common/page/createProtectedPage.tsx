import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { AuthGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../../../layout/DashboardSiteLayout';

export function createProtectedPage(component: ReactElement) {
  const protectedPage: NextPage = () => {
    return component;
  };

  protectedPage.getLayout = (page) => (
    <AuthGuard>
      <DashboardSiteLayout>{page}</DashboardSiteLayout>
    </AuthGuard>
  );
  return protectedPage;
}
