import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';

export const StyledArrowDownIcon = styled(ArrowDownwardIcon)(() => ({
  color: '#CF372C',
  fontSize: 'large',
}));
export const StyledArrowUpIcon = styled(ArrowUpwardIcon)(() => ({
  color: '#0A7A4B',
  fontSize: 'large',
}));
export const StyledTrendPrecentSuccessBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
  padding: '4px 5px',
  height: '32px',
  background: 'rgba(39, 194, 129, 0.1)',
  color: '#0A7A4B',
  borderRadius: '2px',
  marginLeft: theme.spacing(1),
}));
export const StyledTrendPrecentErrorBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '13px',
  padding: '4px 5px',
  height: '32px',
  background: 'rgba(207, 55, 44, 0.1)',
  color: '#CF372C',
  borderRadius: '2px',
  marginLeft: theme.spacing(1),
}));
