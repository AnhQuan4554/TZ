import { AccordionSummary, Grid, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

export const StyledAccordionSummaryRoot = styled(AccordionSummary)(() => ({
  backgroundColor: '#293343 !important',
  color: 'ffffff !important',
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#F8F8F8',
  },
  '& .MuiAccordionSummary-content': {
    display: 'content',
    justifyContent: 'center',
  },
  height: '94px',
}));

export const StyledTimeCacbonMassItem = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 700,
}));

export const StyledViewMoreOfDateItem = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  textAlign: 'end',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '50px',
}));

export const StyledTotalTokenGrid = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '24px',
  marginTop: theme.spacing(2),
}));

export const StyledTimelineContentGrid = styled(Grid)(({ theme }) => ({
  boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.04)',
  padding: theme.spacing(3),
}));

export const StyledCategoryTimelineTitle = styled('h3')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '20px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'left',
}));

export const StyledTimelineTitle = styled('h4')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '20px',
  color: theme.palette.text.secondary,
  textAlign: 'left',
}));

export const StyledSubIconGrid = styled(Grid)(() => ({
  textAlign: 'end',
  position: 'relative',
}));

export const StyledParameterTimeline = styled('p')(({ theme }) => ({
  margin: theme.spacing(0),
  fontWeight: 700,
  fontSize: '16px',
  color: theme.palette.text.secondary,
}));
export const StyledParameterTimelineValue = styled('span')(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  margin: theme.spacing(0),
  fontWeight: 400,
  fontSize: '16px',
  color: theme.palette.text.secondary,
  wordBreak: 'break-word',
}));

export const StyledMiscGrid = styled('span')(() => ({
  display: '-webkit-box',
  wordBreak: 'break-word',
}));

export const StyledAccordionSummaryReading = styled(AccordionSummary)(({ theme }) => ({
  borderTop: '1px dashed rgba(145, 158, 171, 0.15) !important',
  borderBottom: '1px dashed rgba(145, 158, 171, 0.15) !important',
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.primary.main,
  },
}));

export const StyledViewMeterTypography = styled(Typography)(({ theme }) => ({
  width: '100%',
  textAlign: 'end',
  color: theme.palette.primary.main,
  fontSize: '16px',
  fontWeight: 500,
}));

export const StyledParameterDevicesGrid = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  borderLeft: '1px solid rgba(145, 158, 171, 0.15)',
  textAlign: 'center',
}));

export const StyledMeterReadingLabel = styled('span')(({ theme }) => ({
  display: 'inline-block',
  marginRight: theme.spacing(1),
  fontWeight: 'bold',
}));

export const StyledActionButtonGrid = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'end',
  cursor: 'pointer',
}));

export const StyledLaunchIconStyle = styled(LaunchIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledTimeLineDialog = styled(Grid)(({ theme }) => ({
  display: 'flex',
  fontSize: '16px',
  color: theme.palette.text.secondary,
  padding: '8px 0',
}));

export const StyledModalTitle = styled('b')(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(1),
}));

export const StyledModalSubTitleGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  fontSize: '14px',
  color: theme.palette.text.secondary,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

export const StyledModalEnergyGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
}));

export const StyledMetricLineGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  flexDirection: 'row',
}));

export const StyledTitleEnergyGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  fontSize: '14px',
  color: theme.palette.text.secondary,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const StyledValueEnergyGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  fontSize: '14px',
  color: theme.palette.text.primary,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const StyledIconCenterTimelineGrid = styled(Grid)(() => ({
  border: '0.3em solid #FFF',
  borderRadius: '50%',
  height: '50px',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledDivider = styled(Divider)(() => ({
  borderWidth: '2px !important',
  width: '0px  !important',
  margin: 'auto  !important',
  height: '100%  !important',
}));
