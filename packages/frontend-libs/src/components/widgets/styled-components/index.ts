import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from '@mui/material';

export const StyledSingleMetricBlockRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flex: 'auto',
  alignItems: 'center',
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(5),
  border: '1px solid black',
  borderColor: theme.palette.grey[400],
  borderRadius: '5px',
}));

export const StyledSingleMetricBlockText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: theme.spacing(3),
  color: theme.palette.text.primary,
}));

export const StyledStatisticsOverviewWidgetBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  width: '100%',
}));

export const StyledStepBox = styled(Box)(({ theme }) => ({
  borderTop: '1px dashed',
  borderColor: theme.palette.grey[400],
  display: 'flex',
  flex: 1,
}));

export const StyledStepBorderBox = styled(Box)(({ theme }) => ({
  borderLeft: '2px solid',
  borderColor: theme.palette.primary.main,
}));

export const StyledTotalWidgetCard = styled(Card)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}));

export const StyledTotalWidgetBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));
