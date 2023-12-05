import type { FC } from 'react';
import { Box, Popover, Grid, Typography } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  siteAddress: string;
  siteName: string;
  dataTestId: string;
}

export const SiteSelectedPopOver: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, siteAddress, siteName, dataTestId, ...other } = props;

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
        sx: {
          width: 397,
          top: '145px !important',
          left: {
            xl: '370px !important',
            md: '370px !important',
            xs: '16px !important',
          },
        },
      }}
      transitionDuration={0}
      {...other}
    >
      <Typography
        data-test-id={`${dataTestId}-selected`}
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
              data-test-id={`${dataTestId}-name`}
              variant="body1"
              style={{ fontSize: '16px', fontWeight: 700 }}
            >
              {siteName}
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
              data-test-id={`${dataTestId}-location`}
              variant="body1"
              style={{ fontSize: '16px', fontWeight: 400, color: '#5C6A82' }}
            >
              {siteAddress}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Popover>
  );
};
