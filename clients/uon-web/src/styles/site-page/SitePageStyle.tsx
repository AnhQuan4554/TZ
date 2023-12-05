import { makeStyles } from '@mui/styles';

export const sitePageSite = makeStyles({
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
    paddingBottom: '24px',
    marginTop: '90px',
  },
  wrapBoxStyle: {
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0px 6px 15px rgb(100 116 139 / 12%)',
    paddingBottom: '121px',
  },
});
