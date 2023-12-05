import { Link } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { useAuth } from '../../contexts';

interface PermissionLinkProps {
  allowPermissions: string[];
  href: string;
  mode: 'disabled' | 'hidden';
  children: ReactNode;
}

export const PermissionLink: FC<PermissionLinkProps> = (props) => {
  const { allowPermissions, href, children, mode } = props;
  const { user } = useAuth();
  const hasPermissions = allowPermissions.some((permission) =>
    user?.permissions?.includes(permission)
  );
  if (hasPermissions) {
    return <Link href={href}>{children}</Link>;
  }

  if (mode === 'disabled') {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link className="disabledCursor" onClick={(event) => event.preventDefault()}>
        {children}
      </Link>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
