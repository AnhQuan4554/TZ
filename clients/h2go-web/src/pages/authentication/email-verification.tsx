import type { NextPage } from 'next';
import Head from 'next/head';
import { GuestGuard } from '@tymlez/devias-material-kit/dist/components/authentication/guest-guard';
import { EmailVerification } from '@tymlez/frontend-libs';

const EmailVerificationPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Email Verification</title>
      </Head>
      <EmailVerification />
    </>
  );
};

EmailVerificationPage.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default EmailVerificationPage;
