import type { FC } from 'react';
import * as React from 'react';
import { Box, Popover, Grid, Typography } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const SiteSelectedPopOver: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={open === true}
      PaperProps={{
        sx: { width: 397, top: '145px !important', left: '370px !important' },
      }}
      transitionDuration={0}
      {...other}
    >
      <Typography
        style={{
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: '36px',
          paddingTop: '20px',
          paddingLeft: '20px',
        }}
      >
        Site selected
      </Typography>

      <Grid>
        <Box
          sx={{
            alignItems: 'center',
            padding: '24px 16px 0px 34px',
            display: 'flex',
          }}
        >
          <DomainIcon fontSize="small" />
          <Box
            sx={{
              ml: 1,
            }}
          >
            <Typography
              variant="body1"
              style={{ fontSize: '16px', fontWeight: 700 }}
            >
              Woodie Woodie Mine
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            padding: '16px 16px 12px 34px',
            display: 'flex',
          }}
        >
          <LocationOnIcon fontSize="small" style={{ color: '#5C6A82' }} />
          <Box
            sx={{
              ml: 1,
            }}
          >
            <Typography
              variant="body1"
              style={{ fontSize: '16px', fontWeight: 400, color: '#5C6A82' }}
            >
              Western Australia, Australia
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Popover>
  );
};
