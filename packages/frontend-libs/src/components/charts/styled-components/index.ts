import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

export const StyledFullHeightDFlexCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
}));

export const StyledOverviewGenerationCardContent = styled(CardContent)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
}));

export const StyledLineStyledChartBox = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledSubTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

export const StyledHistoryQueryTextGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
}));

export const StyledChartBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));
