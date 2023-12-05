import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

export const StyledBackToGrid = styled(Grid)(() => ({
  margin: '28px 0px 8px 0px',
  display: 'flex',
  flexWrap: 'wrap',
  cursor: 'pointer',
}));

export const StyledBackToText = styled('p')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StyledBannerImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxHeight: '456px',
  backgroundSize: 'cover',
  backgroundRepeat: ' no-repeat',
  backgroundPosition: 'center center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(9),
    height: '187px',
    backgroundSize: 'cover',
    backgroundRepeat: ' no-repeat',
    backgroundPosition: 'center center',
  },
}));

export const StyledMainGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '0px 32px 32px',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: '0px 16px 32px',
    backgroundColor: '#fff',
  },
}));

export const StyledAvatar = styled(Grid)(({ theme }) => ({
  width: 'auto',
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginTop: '-145px',
  position: 'absolute',
  boxShadow: '0 4px 8px 0 rgb(0 0 0 / 0%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
  [theme.breakpoints.down('sm')]: {
    float: 'left',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginTop: theme.spacing(0),
    position: 'relative',
    boxShadow: '0 4px 8px 0 rgb(0 0 0 / 0%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
  },
}));

export const StyledAvatarImage = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '84px',
  },
}));

export const StyledIntroduceGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(18),
  },
}));

export const StyledNameTokenText = styled('h3')(({ theme }) => ({
  margin: '0px 0px 8px 0px',
  fontSize: '32px',
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const StyledValueTokenText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '24px',
  fontWeight: 500,
}));

export const StyledImgGrid = styled(Grid)(() => ({
  margin: '5px 0px',
}));

export const StyledInforText = styled('p')(({ theme }) => ({
  margin: '0px 0px 8px 0px',
  [theme.breakpoints.down('sm')]: {
    margin: '10px 0px 0px 0px',
  },
}));

export const StyledValueInforText = styled('span')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  wordBreak: 'break-all',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    wordBreak: 'break-all',
  },
}));

export const StyledStatusText = styled('span')(() => ({
  display: 'block',
  color: '#65748B',
  margin: '10px 0px 8px 0px',
}));

export const StyledMemoText = styled('p')(() => ({
  color: '#65748B',
  margin: '10px 0px 8px 0px',
}));

export const StyledMemoValueText = styled('span')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    wordWrap: 'break-word',
  },
}));

export const StyledTokenKeyGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledTokenKeyText = styled('p')(() => ({
  color: '#65748B',
  margin: '0px 10px 0px 0px',
}));

export const StyledSizeTokenImage = styled('img')(() => ({
  width: '20px',
  height: '20px',
}));

export const StyledInforDetailGrid = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledBtnGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'end',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
    flexDirection: 'column-reverse',
  },
}));

export const StyledImageBox = styled(Box)(({ theme }) => ({
  width: 120,
  marginLeft: theme.spacing(5),
}));

export const StyledLedgerWorksGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'right',
  cursor: 'pointer',
}));
