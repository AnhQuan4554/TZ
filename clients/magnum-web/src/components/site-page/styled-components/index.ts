import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledContainerBox = styled(Box)(({ theme }) => ({
  border: '1px solid #ECECEC',
  borderRadius: '8px',
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

export const StyledLabelBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const StyledLabelTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: theme.palette.text.secondary,
}));

export const StyledNumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.text.primary,
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const StyledSummaryFinalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const StyledSummaryFinalTypography = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '24px',
  color: theme.palette.text.secondary,
}));

export const StyledNumberValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.text.primary,
  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '24px',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const StyledTrendLineTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

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
  paddingTop: theme.spacing(0),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(3),
}));
