import { makeStyles } from '@mui/styles';

export const CommonStyle = makeStyles({
  stickyTitleHeader: {
    marginTop: '-27px',
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    height: '90px',
    maxWidth: '100%',
    backgroundColor: '#f9fafc',
    zIndex: 99,
    paddingTop: '20px',
    marginLeft: '-24px',
    paddingLeft: '24px',
    paddingRight: '90px',
  },
  arrowDropUpIconStyle: {
    width: '24px',
    height: '24px',
    color: '#75A640',
    marginTop: '8px',
    marginLeft: '10px',
  },
  arrowDropDownIcon: {
    width: '24px',
    height: '24px',
    color: '#75A640',
    marginTop: '8px',
    marginLeft: '10px',
  },
  bodyBoxStyle: {
    display: 'flex',
    width: '100%',
    paddingBottom: '24px',
    marginTop: '55px',
  },
  popupOver: {
    width: 397,
    top: '160px !important',
    left: '370px !important',
  },
  '@media (max-width:426px)': {
    bodyBoxStyle: {
      display: 'flex',
      width: '100%',
      paddingBottom: '24px',
      marginTop: '0px',
    },
  },
  wrapBoxStyle: {
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0px 6px 15px rgb(100 116 139 / 12%)',
    paddingBottom: '121px',
  },
  titleRec: {
    fontWeight: 700,
    fontSize: '24px',
    color: '#293343',
    margin: '0px 0px 28px 0px',
  },
  titleTable: {
    fontWeight: 700,
    fontSize: '24px',
    color: '#293343',
    margin: '0px 0px 8px 0px',
  },
  subTitleTable: {
    fontWeight: 400,
    fontSize: '16px',
    color: '#5C6A82',
    margin: '0px',
  },
  dateToday: {
    fontWeight: 500,
    fontSize: '13px',
    color: '#5C6A82',
    margin: '0px 0px 6px 6px',
  },
  gridResultAndInfo: {
    display: 'flex',
    borderBottom: '1px dotted rgba(145, 158, 171, 0.15)',
    paddingBottom: '29px',
  },
  result: {
    fontWeight: 700,
    fontSize: '20px',
    color: '#293343',
    margin: '0px 0px 0px 0px',
  },
  info: {
    fontWeight: 400,
    fontSize: '13px',
    color: '#5C6A82',
    margin: '0px 0px 0px 0px',
  },
  cardName: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dotted rgba(145, 158, 171, 0.15)',
    paddingBottom: '8px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  iconDateRange: {
    fontSize: 18,
    color: '#5C6A82',
  },
  gridGeneratedToday: {
    marginLeft: '15px',
  },
  gridLast7Day: {
    display: 'flex',
    marginTop: '25px',
  },
  titleCard: {
    fontWeight: 700,
    fontSize: '16px',
    color: '#293343',
    margin: '0px 0px 0px 12px',
  },
  boxCircle: {
    height: '30px',
    paddingLeft: '2px',
    paddingRight: '2px',
    borderRadius: '50%',
    border: 'solid 5px #E9D1D1',
  },
  circle: {
    width: '16px',
  },
  imgTitle: {
    width: '40px',
  },
  gridRealTimeUpdate: {
    display: 'flex',
    marginTop: '10px',
  },
  gridData: {
    display: 'flex',
    marginTop: '-20px',
    alignItems: 'center',
  },
});
