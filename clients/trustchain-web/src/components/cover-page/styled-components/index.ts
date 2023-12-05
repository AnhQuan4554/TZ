import { styled } from '@mui/material/styles';
import { Box, Grid, FormControl, Paper, InputBase } from '@mui/material';

export const StyledBannerBackgroundGrid = styled(Grid)(() => ({
  width: '100%',
  height: 'auto',
  backgroundSize: 'cover',
  backgroundRepeat: ' no-repeat',
  backgroundPosition: 'center center',
}));

export const StyledBannerGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  opacity: 1,
}));

export const StyledContentForBannerGrid = styled(Grid)(({ theme }) => ({
  padding: '20px 40px',
  display: 'flex',
  borderBottomStyle: 'solid',
  borderBottomColor: '#66788A',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    borderBottomStyle: 'solid',
    borderBottomColor: '#66788A',
  },
}));

export const StyledProjectImg = styled('img')(({ theme }) => ({
  width: '200px',
  height: '200px',
  marginTop: theme.spacing(3),
}));

export const StyledMainContentGrid = styled(Grid)(({ theme }) => ({
  marginLeft: '40px',
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(0),
    width: '100%',
  },
}));

export const StyledMainContentText = styled('h3')(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 700,
  lineHeight: '36px',
  marginTop: theme.spacing(1),
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '24px',
    color: '#fff',
    fontWeight: 700,
    lineHeight: '24px',
    margin: '15px 0px 8px 0px',
  },
}));

export const StyledSubTitleText = styled('h5')(({ theme }) => ({
  fontSize: '16px',
  color: '#fff',
  fontWeight: 500,
  lineHeight: '36px',
  width: '60%',
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '16px',
    color: '#fff',
    fontWeight: 500,
    lineHeight: '24px',
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    color: '#fff',
    fontWeight: 500,
    lineHeight: '24px',
    width: '100%',
  },
}));

export const StyledParamInBannerGrid = styled(Grid)(({ theme }) => ({
  padding: '20px 40px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 16px',
    display: 'flex',
  },
}));

export const StyledTitleText = styled('p')(({ theme }) => ({
  color: '#fff',
  fontWeight: 400,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    color: '#fff',
    fontWeight: 400,
    margin: 0,
    fontSize: '13px',
  },
}));

export const StyledValueSpan = styled('span')(({ theme }) => ({
  color: 'rgb(255, 255, 255)',
  fontSize: '24px',
  fontWeight: 400,
  margin: theme.spacing(0),
}));

export const StyledMainGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '5px 24px 5px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    marginTop: theme.spacing(2),
    borderRadius: '8px',
  },
}));

export const StyledDateGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: 'fit-content',
  height: '40px',
  borderRadius: '24px',
  backgroundColor: '#EFF4EA',
  color: theme.palette.primary.main,
  lineHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  padding: '0px 20px',
  marginBottom: theme.spacing(2),
}));

export const StyledDateChooseText = styled('p')(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 400,
  marginRight: theme.spacing(1),
}));

export const StyledItemPaper = styled(Paper)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: '#fff',
  color: 'rgba(0, 0, 0, 0.6)',
  padding: theme.spacing(2),
  border: '1px solid #ECECEC',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.6)',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    border: '1px solid #ECECEC',
  },
}));

export const StyledImageCardGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  // backgroundColor: '#F5F5F5',
  borderRadius: '4px',
  padding: theme.spacing(1),
  textAlign: 'center',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
  },
}));

export const StyledImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
}));

export const StyledNameCardGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(0),
  },
}));

export const StyledNameCardText = styled('p')(({ theme }) => ({
  fontSize: '10px',
  margin: theme.spacing(0),
  fontWeight: 700,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    margin: theme.spacing(0),
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '14px',
    margin: theme.spacing(0),
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
}));

export const StyledIdText = styled('span')(({ theme }) => ({
  fontSize: '11px',
  lineHeight: '22px',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '22px',
    color: theme.palette.text.primary,
  },
}));

export const StyledComonGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
}));

export const StyledIconImg = styled('img')(({ theme }) => ({
  width: '20px',
  height: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '30px',
    height: '30px',
  },
  [theme.breakpoints.up('xl')]: {
    width: '30px',
    height: '30px',
  },
}));

export const StyledTokenGrid = styled(Grid)(() => ({
  display: 'flex',
  margin: '14px 0px 4px 0px',
  alignItems: 'center',
}));

export const StyledTokenText = styled('p')(({ theme }) => ({
  fontSize: '12px',
  margin: '0px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    margin: '0px 0px',
  },
}));

export const StyledValueTokenSpan = styled('span')(({ theme }) => ({
  fontSize: '14px',
  color: '#000000',
  fontWeight: 500,
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    color: '#000000',
    fontWeight: 500,
    marginLeft: theme.spacing(1),
  },
}));

export const StyledDottedBox = styled(Box)(({ theme }) => ({
  height: 1,
  width: '100%',
  borderRadius: 0,
  borderWidth: 1,
  borderColor: 'rgba(145, 158, 171, 0.15)',
  borderStyle: 'dotted',
  marginTop: theme.spacing(1),
}));

export const StyledTokenDateAndValueGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const StyledTitleDetailGrid = styled(Grid)(() => ({
  margin: '12px 0px 4px 0px',
}));

export const StyledRootAuthorityAccountText = styled('p')(({ theme }) => ({
  margin: theme.spacing(0),
  fontSize: '8px',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0),
    fontSize: '12px',
  },
}));

export const StyledRootValueText = styled('span')(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.text.primary,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    color: theme.palette.text.primary,
    fontWeight: '500',
  },
}));

export const StyledRootAccountGrid = styled(Grid)(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(2),
}));

export const StyledHistoryQueryFormGrid = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

export const StyledFormGroupGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
    width: '100%',
  },
}));

export const StyledFilterDateText = styled('p')(({ theme }) => ({
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(1),
  color: '#65748B',
  fontSize: '1rem',
  fontWeight: 400,
}));

export const StyledWidthFullFormControl = styled(FormControl)(() => ({
  width: '100%',
}));

export const StyledBootstrapInputBase = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    display: 'flex',
    alignItems: 'center',
    height: '35px !important',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: 'box - shadow',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      // borderColor: "#80bdff",
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export const StyledFormGroupTypesGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '-10px',
}));

export const StyledChooseFilterGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const StyledShortByText = styled('p')(({ theme }) => ({
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(2),
  color: '#989898',
  fontSize: '13px',
  fontWeight: '400',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
    color: '#989898',
    fontSize: '13px',
    fontWeight: '400',
  },
}));
