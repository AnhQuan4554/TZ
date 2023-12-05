import { makeStyles } from '@mui/styles';

export const energyStyles = makeStyles({
  hydrogenValue: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    color: '#293343',
    marginRight: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    color: '#293343',
  },
  jcFlexStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  jcCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jcFlexEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gridContainer: {
    borderTop: '1px dashed #ECECEC',
    padding: '16px',
    alignItems: 'center',
  },
});
