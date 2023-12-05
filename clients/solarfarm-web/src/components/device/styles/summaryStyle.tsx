import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Typography } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const StyledCardNameGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px dotted rgba(145, 158, 171, 0.15)',
  paddingBottom: theme.spacing(2),
}));

export const StyledCardTitleGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledtitleCardP = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  color: theme.palette.text.primary,
  margin: theme.spacing(0),
  marginLeft: theme.spacing(2),
}));

export const StyledTitleImg = styled('img')(() => ({
  width: '40px',
}));

export const StyledResultTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const StyledMetricLabelP = styled('p')(({ theme }) => ({
  fontSize: '23px',
  fontWeight: 700,
  margin: theme.spacing(2),
  marginTop: theme.spacing(0),
}));

export const StyledMetricValueTypography = styled(Typography)(() => ({
  fontSize: '23px',
  fontWeight: 700,
}));

export const StyledArrowDropUpIcon = styled(ArrowDropUpIcon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

export const StyledArrowDropDowIcon = styled(ArrowDropDownIcon)(
  ({ theme }) => ({
    width: '24px',
    height: '24px',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  }),
);

export const StyledTitleRecP = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '24px',
  color: theme.palette.text.primary,
  margin: theme.spacing(0),
  marginBottom: theme.spacing(1),
}));

export const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgb(238 238 238)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#92D050',
  },
}));

export const StyledTableBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(0),
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

export const StyledCardGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px dotted rgba(145, 158, 171, 0.15)',
  paddingBottom: theme.spacing(2),
}));

export const StyledCardTitleText = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  color: theme.palette.text.primary,
  margin: '0px 0px 0px 12px',
}));

export const SummaryStyle = makeStyles({
  metricLabel: {
    fontSize: '23px',
    fontWeight: 700,
    margin: '0 16px 16px 16px',
  },
  metricValue: { fontSize: '23px', fontWeight: 700 },
  '@media (min-width:768px) and ( max-width:1440px)': {
    metricLabel: { fontSize: '18px' },
    metricValue: { fontSize: '18px' },
  },
  '@media ( max-width:767px)': {
    metricLabel: { fontSize: '14px' },
    metricValue: { fontSize: '14px' },
  },
});
