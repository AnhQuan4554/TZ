import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { gtm } from '@tymlez/devias-material-kit/dist/lib/gtm';
import { NotFound } from '@tymlez/frontend-libs';

const NotFoundPage: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Error: Not Found</title>
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
