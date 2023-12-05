import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { RolesGuard, AuthGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';

export function createProtectedPage(
  component: ReactElement,
  permissions: string[] = [],
) {
  const protectedPage: NextPage = () => {
    return component;
  };

  protectedPage.getLayout = (page) => (
    <AuthGuard>
      <RolesGuard permissions={permissions}>
        <DashboardSiteLayout>{page}</DashboardSiteLayout>
      </RolesGuard>
    </AuthGuard>
  );
  return protectedPage;
}
