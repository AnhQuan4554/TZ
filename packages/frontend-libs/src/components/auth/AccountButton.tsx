import { ButtonBase } from '@mui/material';
import { useRef, useState } from 'react';
import { UserCircle as UserCircleIcon } from '@tymlez/devias-material-kit/dist/icons/user-circle';

import { useAuth } from '../../contexts/FirebaseContext';
import { AccountPopover } from './AccountPopover';
import {
  StyledAccountButtonBox,
  StyledArrowDropDown,
  StyledArrowDropUp,
  StyledAvatar,
  StyledUserNameGrid,
} from './styled-components';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';

export const AccountButton = () => {
  const { user } = useAuth();
  const isSmallScreen = useBreakpoint('sm', 'down');
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <StyledAccountButtonBox component={ButtonBase} onClick={handleOpenPopover} ref={anchorRef}>
        <StyledAvatar src="../logo/tymleztlime.png" variant="rounded">
          <UserCircleIcon fontSize="small" />
        </StyledAvatar>
        {!isSmallScreen && <StyledUserNameGrid>{user?.name || user?.email}</StyledUserNameGrid>}

        {openPopover ? <StyledArrowDropUp /> : <StyledArrowDropDown />}
      </StyledAccountButtonBox>
      <AccountPopover
        dataTestId="admin-account-popover"
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};
