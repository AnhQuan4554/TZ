import { Button, ButtonProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import type { FC } from 'react';
import { useAuth } from '../../contexts';

interface PermissionButtonProps extends ButtonProps {
  allowPermissions: string[];
  mode?: 'disabled' | 'hidden';
  isLoadingButton?: boolean;
  loading?: boolean;
}

export const PermissionButton: FC<PermissionButtonProps> = ({
  allowPermissions,
  loading,
  isLoadingButton = false,
  mode = 'disabled',
  ...rest
}) => {
  const { user } = useAuth();
  const hasPermissions = allowPermissions.some((permission) =>
    user?.permissions?.includes(permission)
  );

  if (hasPermissions) {
    if (isLoadingButton) {
      return <LoadingButton loading={loading} {...rest} />;
    }
    return <Button {...rest} />;
  }
  if (mode === 'disabled') {
    // eslint-disable-next-line no-param-reassign
    rest.disabled = true;
    return <Button {...rest} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
