import type { FC } from 'react';
import toast from 'react-hot-toast';
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { Cog as CogIcon } from '@tymlez/devias-material-kit/dist/icons/cog';
import { UserCircle as UserCircleIcon } from '@tymlez/devias-material-kit/dist/icons/user-circle';
import { useAuth } from '../../contexts/FirebaseContext';
import { StyledAccountPopoverBox, StyledAvatar } from './styled-components';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  dataTestId?: string;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, dataTestId, ...other } = props;
  const { logout, user } = useAuth();
  const adminUrl = `${window?.origin || ''}/admin`;
  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.();
      await logout('/authentication/login');
    } catch (err) {
      toast.error('Unable to logout.');
    }
  };
  return (
    <Popover
      data-test-id={dataTestId}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={open === true}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <StyledAccountPopoverBox>
        <StyledAvatar src={user?.avatar || '../logo/tymleztlime.png'}>
          <UserCircleIcon fontSize="small" />
        </StyledAvatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user?.email}</Typography>
        </Box>
      </StyledAccountPopoverBox>
      <Divider />

      <Box sx={{ my: 1 }}>
        {user?.roles?.includes('admin') && (
          <NextLink href={adminUrl} passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <CogIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1">System Admin</Typography>} />
              <Divider />
            </MenuItem>
          </NextLink>
        )}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
        </MenuItem>
      </Box>
    </Popover>
  );
};
