import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

export const StyledWeatherGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  '& > div': {
    boxShadow: 'none',
    width: '100%',
  },
  '& > div > div': {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'space-around',
    '& > div': {
      boxShadow: 'none',
    },
  },
}));

export const StyledSolarEnergyGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
export const StyledTitleSolarEnergyText = styled('h5')(({ theme }) => ({
  margin: theme.spacing(0),
  fontSize: '13px',
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(0),
    textAlign: 'center',
  },
}));

export const StyledValueEnergyTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}));

export const StyledBoxLineChartEnergyBox = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledImgBuildingGrid = styled(Grid)(({ theme }) => ({
  borderTop: '1px dotted rgba(145, 158, 171, 0.15)',
  paddingLeft: theme.spacing(0),
}));

export const StyledKeyMetricsAndDateGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    flexDirection: 'column',
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
}));

export const StyledTitleKeyMetricsTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
    color: theme.palette.text.primary,
  }),
);

export const StyledMarkerWrapGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
}));

export const StyledMarkerGrid = styled(Grid)(({ theme }) => ({
  width: '15px',
  height: '15px',
  borderRadius: '2px',
  marginRight: theme.spacing(2),
}));

export const StyledMarkerTextGrid = styled(Grid)(() => ({
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
}));

export const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  marginBottom: '12px',
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const StyledKeyMetricsMobileGrid = styled(Grid)(({ theme }) => ({
  border: '1px solid rgba(145, 158, 171, 0.15)',
  padding: theme.spacing(3),
  borderRadius: '4px',
}));

export const StyledTitleValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const StyledValueGrid = styled(Grid)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledMetricTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
}));

export const StyledMetricValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
}));

export const StyledJcFlexStartGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: theme.spacing(1),
}));

export const StyledJcCenterGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledJcFlexEndGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

export const StyledContainerGrid = styled(Grid)(() => ({
  borderTop: '1px dashed #ECECEC',
  alignItems: 'center',
}));
