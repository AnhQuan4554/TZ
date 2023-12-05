import type { FC } from 'react';
import { useAuth } from '../../contexts';
import { ConfirmButton, ConfirmButtonProps } from '../confirm-button';

interface PermissionConfirmButtonProps extends ConfirmButtonProps {
  allowPermissions: string[];
  mode?: 'disabled' | 'hidden';
}

export const PermissionConfirmButton: FC<PermissionConfirmButtonProps> = ({
  allowPermissions,
  mode = 'disabled',
  ...rest
}) => {
  const { user } = useAuth();
  const hasPermissions = allowPermissions.some((permission) =>
    user?.permissions?.includes(permission)
  );

  if (hasPermissions) {
    return <ConfirmButton {...rest} />;
  }
  if (mode === 'disabled') {
    return <ConfirmButton {...{ ...rest, disabled: true }} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
