import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledMainTitleComponentBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledTableStyleBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(3),
}));

export const StyledFooterComponentBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const StyledFooterTitleTypography = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
}));
