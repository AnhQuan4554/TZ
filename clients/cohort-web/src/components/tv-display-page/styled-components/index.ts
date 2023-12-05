import { styled } from '@mui/material/styles';
import { Grid, Typography, Card, Box } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

export const StyledCardWeatherGrid = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxShadow: 'none',
}));

export const StyledCarbonOutputGrid = styled(Grid)(({ theme }) => ({
  border: '1px solid rgba(145, 158, 171, 0.15)',
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  height: '100%',
}));

export const StyledDateTimeGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledTitleCarbonOutputTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '16px',
    fontWeight: '700',
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(1),
  }),
);

export const StyledDataTime5MinutesGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledDateRangeIcon = styled(DateRangeIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  width: '18px',
  height: '24px',
  marginRight: theme.spacing(1),
}));

export const StyledTitleMinutesTypography = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: '500',
  color: theme.palette.text.secondary,
}));

export const StyledBoxValueAndPercentageBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledTitleValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const StyledBoxDottedBox = styled(Box)(({ theme }) => ({
  border: '1px dotted rgba(145, 158, 171, 0.15)',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const StyledBoxValueAndLineChartBox = styled(Box)(() => ({
  marginTop: '-20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledBuildingCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxShadow: 'none',
  border: '1px solid rgba(145, 158, 171, 0.15)',
}));
