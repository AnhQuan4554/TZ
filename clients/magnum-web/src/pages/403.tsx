import type { FC } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import { gtm } from '@tymlez/devias-material-kit/dist/lib/gtm';
import { Forbidden } from '@tymlez/frontend-libs';

const Page403: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Magnum dashboard - Forbidden</title>
      </Head>
      <Forbidden />
    </>
  );
};

export default Page403;
