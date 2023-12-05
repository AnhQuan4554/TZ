import { makeStyles } from '@mui/styles';

export const ReportStyle = makeStyles({
  dashBoardReport: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  titleReportCard: {
    color: '#75A640',
    fontWeight: '700',
    marginTop: '16px',
  },
  descriptionReportCard: {
    fontWeight: '400',
  },
  backTo: {
    margin: '0px 0px 8px 0px',
    display: 'flex',
    flexWrap: 'wrap',
    cursor: 'pointer',
    marginTop: '-16px',
  },
  titleBackTo: {
    marginLeft: '8px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#293343',
  },
  bodyBoxStyle: {
    display: 'flex',
    width: '100%',
    marginTop: '0px',
    backgroundColor: '#FCFCFC',
    padding: '24px',
    '@media (max-width: 320px)': {
      maxWidth: '304px',
    },
  },
  gridFormGroup: {
    // marginLeft: '316px',
    display: 'flex',
    flexDirection: 'column',
    // marginTop: '-32px',
  },
  BootstrapInput: {
    'label + &': {
      marginTop: '24px',
    },
    '& .MuiInputBase-input': {
      display: 'flex',
      alignItems: 'center',
      height: '35px !important',
      borderRadius: 4,
      position: 'relative',
      // backgroundColor: '#FFFFFF',
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
  },
  filterDate: {
    margin: '0px 0px 8px 0px',
    fontSize: '1rem',
    fontWeight: 700,
  },
  filterReport: {
    width: '100%',
    backgroundColor: '#F4F5F7',
    padding: '12px 12px 12px',
  },
  btnReport: {
    backgroundColor: '#92D050',
    height: '56px',
    color: '#fff',
    borderRadius: '0px',
    marginTop: '32px',
    width: '100%',
    '&:hover': {
      color: '#92D050',
      border: '1px solid #92D050',
    },
  },
  titleReport: {
    fontSize: '24px',
    fontWeight: '700',
  },
  descriptionReport: {
    fontSize: '16px',
    fontWeight: '400',
  },
  '@media (max-width: 600px)': {
    gridFormGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '0px',
      marginLeft: '0px',
      width: '100%',
    },
    btnReport: {
      marginTop: '8px',
    },
  },
});
