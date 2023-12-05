import type { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/FirebaseContext';

interface Props {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
}

export const RolesGuard: FC<Props> = (props) => {
  const { children, roles, permissions } = props;
  const { user, isAuthenticated } = useAuth();

  const router = useRouter();
  if (!isAuthenticated || !user || !user.roles || !user.permissions) {
    router.push('/401');
    return null;
  }

  if (permissions && !permissions.some((role) => user?.permissions?.includes(role))) {
    router.push('/403');
    return null;
  }

  if (roles && !roles.some((role) => user?.roles?.includes(role))) {
    router.push('/403');
    return null;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
