import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Select, Typography, Grid, Button, Box } from '@mui/material';
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';

export const StyledFooterGrid = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  alignItems: 'center',
}));

export const StyledFooterBodyGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
}));

export const StyledItemPerPageTypography = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
}));

export const StyledPageSelection = styled(Select)(() => ({
  height: '24px',
  borderRadius: '4px',
}));

export const StyledNavButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: `${theme.palette.text.primary}  !important`,
  padding: theme.spacing(1),
  '&:hover': {
    color: theme.palette.grey,
    padding: theme.spacing(1),
  },
  '&.Mui-disabled': {
    color: 'rgba(0, 0, 0, 0.26) !important',
  },
}));

export const StyledCustomStyledCalendarGrid = styled(Grid)(({ theme }) => ({
  fontFamily: 'Lato, sans-serif !important',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 20px 0 rgba(0, 0, 0, 0.19)',
  width: 'fit-content',
  '& .MuiTypography-caption': {
    fontFamily: 'Lato, sans-serif !important',
    fontWeight: 700,
    fontSize: 13,
    margin: 0,
    background: '#EDF0F2',
    color: theme.palette.text.primary,
    width: 40,
  },
  '& .MuiTypography-root': {
    fontFamily: 'Lato, sans-serif !important',
  },
  '& .MuiDateRangePickerDay-day': {
    fontFamily: 'Lato, sans-serif !important',
    fontSize: 13,
  },
}));

export const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting, selected }) => ({
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: '#F4F5F7',
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: '#F4F5F7',
      },
    }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
    ...(selected && {
      '.MuiDateRangePickerDay-day': {
        backgroundColor: '#92D050 !important',
        color: '#3A5320 !important',
        '&:hover, &:focus': {
          backgroundColor: '#92D050',
        },
      },
    }),
  })
) as React.ComponentType<DateRangePickerDayProps<Date>>;

export const StyledDateTextStyleGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderTop: '1px solid #F4F5F7',
  backgroundColor: '#ffffff',
}));

export const StyledDateBodyTextGrid = styled(Grid)(() => ({
  width: '290px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const StyledFromDateTextBox = styled(Box)(() => ({
  width: '113px',
  height: '40px',
  borderRadius: '4px',
  backgroundColor: '#EDF0F2',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  lineHeight: '24px',
  fontWeight: 400,
}));

export const StyledToDateTextBox = styled(Box)(() => ({
  width: '113px',
  height: '40px',
  borderRadius: '4px',
  border: '1px solid',
  borderColor: '#92D050',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  lineHeight: '24px',
  fontWeight: 400,
}));

export const StyledApplyButton = styled(Button)(() => ({
  color: '#3A5320 !important',
  backgroundColor: '#A8D973 !important',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '13px',
  lineHeight: '24px',
  textTransform: 'none',
  width: '112px',
  height: '40px',
  borderRadius: '4px !important',
  '&:hover': {
    backgroundColor: '#A8D973 !important',
  },
}));

export const StyledDateRangeTypography = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '24px',
  color: theme.palette.text.primary,
}));

export const customStyle = makeStyles({
  staticDateRangePicker: {
    '& .MuiPickerStaticWrapper-content': {
      minWidth: 'unset',
    },
    '& .MuiPickersToolbar-penIconButton': {
      display: 'none',
    },
    '& .MuiDialogActions-spacing': {
      display: 'none',
    },
  },
});
