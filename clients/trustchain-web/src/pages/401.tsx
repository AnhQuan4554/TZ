import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { gtm } from '@tymlez/devias-material-kit/dist/lib/gtm';
import { Unauthorised } from '@tymlez/frontend-libs';

const AuthorizationRequired: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Error: Authorization Required</title>
      </Head>
      <Unauthorised />
    </>
  );
};

export default AuthorizationRequired;
