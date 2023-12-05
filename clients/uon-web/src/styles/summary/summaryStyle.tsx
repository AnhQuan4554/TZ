import { makeStyles } from '@mui/styles';

export const summaryStyle = makeStyles({
  maintTitleComponent: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
    color: '#293343',
    marginBottom: '12px',
  },
  dateRangeIcon: {
    width: '18px',
    height: '24px',
    color: '#5C6A82',
    marginRight: '8px',
  },
  date: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
    color: '#293343',
  },
  gridHistoryQueryForm: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
