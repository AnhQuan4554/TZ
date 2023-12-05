import { makeStyles } from '@mui/styles';

export const commonStyle = makeStyles({
  actionBtn: {
    color: '#3A5320',
    borderRadius: 0,
    textTransform: 'uppercase',
    border: '1px solid #92d050',
    '&:hover': {
      color: '#92d050',
      backgroundColor: '#fff',
    },
  },
  dialogButton: {
    fontSize: '32px',
    textAlign: 'center',
    fontWeight: 700,
    marginTop: '24px',
  },
});
