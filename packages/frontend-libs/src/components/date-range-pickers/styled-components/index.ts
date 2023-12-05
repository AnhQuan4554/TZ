import { styled } from '@mui/material/styles';
import { Typography, Box, Grid } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

export const StyledDataRangeIcon = styled(DateRangeIcon)(({ theme }) => ({
  width: '18px',
  height: '24px',
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
}));

export const StyledDataRangeTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const StyledHistoryQueryFormRoot = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  justifyItems: 'flex-end',
  flexDirection: 'column',
  marginRight: theme.spacing(0),
  marginLeft: 'auto',
  position: 'absolute',
  fontFamily: 'Lato, sans-serif',
}));

export const StyledDatePickerBox = styled(Box)(({ theme }) => ({
  border: '1px solid #ECECEC',
  borderRadius: '4px',
  height: 'fit-content',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

export const StyledPickerPeriodText = styled('p')(({ theme }) => ({
  fontWeight: 500,
  fontSize: '16px',
  color: theme.palette.text.secondary,
  lineHeight: '24px',
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
}));

export const StyledPickerTimeText = styled('p')(({ theme }) => ({
  fontWeight: 500,
  fontSize: '16px',
  color: theme.palette.text.primary,
  lineHeight: '24px',
}));

export const StyledCalendarGrid = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  zIndex: 99999,
}));
