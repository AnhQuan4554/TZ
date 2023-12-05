import { styled } from '@mui/material/styles';
import { Typography, Paper, Grid } from '@mui/material';

export const StyledSliderGrid = styled(Grid)(({ theme }) => ({
  border: '1px solid rgba(145, 158, 171, 0.15)',
  padding: theme.spacing(3),
  borderRadius: '4px',
}));

export const StyledSliderIconPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 50,
  paddingLeft: theme.spacing(2),
  background: theme.palette.background.paper,
}));

export const StyledSliderValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: theme.spacing(3),
  color: theme.palette.text.primary,
}));

export const StyledSliderMobileGrid = styled(Grid)(() => ({
  '& .MuiMobileStepper-positionStatic': {
    display: 'none',
  },
}));
