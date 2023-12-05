import { useRef, useState } from 'react';
import { Box, DialogTitle, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { Dialog, DialogContent } from '@mui/material';
import ContentDialog from './ContentDialog';
import { format } from 'date-fns';
export const StyledDialogTimeZone = styled(Box)(() => ({
  position: 'relative',
}));
export const StyleTimeZone = styled(Box)(() => ({
  position: 'relative',
  marginRight: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
export const StyledTimeZoneText = styled(Typography)(() => ({
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',

  color: '#825c5c',
}));

export const DialogTimeZone = () => {
  const date = new Date();
  const formattedDate = format(date, 'EEEE, dd MMMM yyyy p');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [showIcon, setShowIcon] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setShowIcon(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowIcon(false);
  };
  const getPositionStyles = () => {
    if (!buttonRef.current) {
      return {};
    }
    const buttonRect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'absolute',
      top: buttonRect.bottom - 20,
      left: buttonRect.left - 100,
    };
  };
  return (
    <StyledDialogTimeZone>
      <StyleTimeZone onClick={handleClickOpen} ref={buttonRef}>
        <img
          src="../world.svg"
          alt="wordl"
          style={{
            marginRight: '10px',
          }}
        />
        <StyledTimeZoneText variant="h4">{formattedDate}</StyledTimeZoneText>
        {showIcon && (
          <img
            src="../triangleIcon.svg"
            alt="icon"
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '0',
              zIndex: '100',
            }}
          />
        )}
      </StyleTimeZone>

      <Dialog open={open} onClose={handleClose} PaperProps={{ style: getPositionStyles() }}>
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0',
          }}
        >
          <ContentDialog />
        </DialogContent>
      </Dialog>
    </StyledDialogTimeZone>
  );
};
