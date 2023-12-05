import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

export const StyledTitleRecTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '24px',
  color: theme.palette.text.primary,
  margin: 0,
  marginBottom: theme.spacing(4),
}));
export const StyledPercenValueGrid = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(6),
  fontWeight: 700,
  fontSize: '24px',
  color: theme.palette.text.primary,
}));
export const StyledPercenWrapGrid = styled(Grid)(({ theme }) => ({
  width: '424px',
  display: 'flex',
  position: 'absolute',
  bottom: theme.spacing(2),
  justifyContent: 'space-around',
}));
export const StyledPercenLeftGrid = styled(Grid)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  color: '#5C6A82',
  paddingLeft: theme.spacing(3),
}));
export const StyledPercenRightGrid = styled(Grid)(() => ({
  fontWeight: 700,
  fontSize: '16px',
  color: '#5C6A82',
}));
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
export const StyledMarkerTextGrid = styled(Grid)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: theme.spacing(3),
}));
