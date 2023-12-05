import type { NextPage } from 'next';
import { GuestGuard } from '@tymlez/devias-material-kit/dist/components/authentication/guest-guard';
import { FirebaseResetPassword } from '@tymlez/frontend-libs';

const ForgotPasswordPage: NextPage = () => {
  return <FirebaseResetPassword />;
};

ForgotPasswordPage.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default ForgotPasswordPage;
