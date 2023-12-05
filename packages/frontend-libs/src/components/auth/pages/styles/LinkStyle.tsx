import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LinkStyle = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
  fontSize: '0.9375rem',
  fontWeight: 600,
  fontFamily: 'Helvetica',
  lineHeight: 1.75,

  '& a': { color: '#92d050' },
});
