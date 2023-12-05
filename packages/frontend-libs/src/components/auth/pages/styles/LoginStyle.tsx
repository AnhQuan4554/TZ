import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxMainStyle = styled(Box)({
  backgroundColor: 'background.default',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  component: 'main',
});

export const BoxCardStyle = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
