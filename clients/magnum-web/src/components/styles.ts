import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.down(426)]: {
    display: 'flex',
    paddingBottom: theme.spacing(3),
    marginTop: '150px',
  },
}));

export const WrapBoxStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0px 6px 15px rgb(100 116 139 / 12%)',
  paddingBottom: '121px',
  background: '#ffffff',
}));

export const StickyTitleHeader = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '90px',
  width: '100%',
  backgroundColor: '#f9fafc',
  zIndex: 99,
  position: 'sticky',
  top: '91px',
  [theme.breakpoints.down(426)]: {
    display: 'block',
    flexDirection: 'row',
    position: 'fixed',
    height: '135px',
    maxWidth: '100%',
    backgroundColor: '#f9fafc',
    zIndex: 99,
    paddingTop: theme.spacing(4),
  },
}));

export const GridHistoryQueryForm = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '100%',
  },
}));
