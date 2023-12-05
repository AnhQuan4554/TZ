import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Popover } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const StickyTitleHeader = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'sticky',
  height: '90px',
  maxWidth: '100%',
  backgroundColor: '#f9fafc',
  zIndex: 99,
  top: 92,
  [theme.breakpoints.down(426)]: {
    display: 'contents',
    position: 'sticky',
    height: '135px',
    maxWidth: '100%',
    backgroundColor: '#f9fafc',
    zIndex: 99,
    top: 90,
  },
}));

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  border: '1px solid #ECECEC',
  borderRadius: '8px',
}));

export const StyledBodyBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingBottom: theme.spacing(3),
}));
export const StyledArrowDropUpIcon = styled(ArrowDropUpIcon)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  color: '#75A640',
  marginTop: '8px',
  marginLeft: '10px',
}));
export const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)(() => ({
  width: '24px',
  height: '24px',
  color: '#75A640',
  marginTop: '8px',
  marginLeft: '10px',
}));
export const StyledPopupOver = styled(Popover)(({ theme }) => ({
  width: 397,
  top: theme.spacing(20),
  left: theme.spacing(47),
}));
export const StyledCardNameGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px dotted rgba(145, 158, 171, 0.15)',
  paddingBottom: theme.spacing(1),
}));
export const StyledCardTitleGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
export const StyledImgTitle = styled('img')(() => ({
  width: '40px',
}));
export const StyledTitleCardP = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  color: theme.palette.text.primary,
  margin: '0px 0px 0px 12px',
}));
export const StyledCircleBox = styled(Box)(() => ({
  height: '30px',
  paddingLeft: '2px',
  paddingRight: '2px',
  borderRadius: '50%',
  border: 'solid 5px #E9D1D1',
}));
export const StyledCircleImg = styled('img')(() => ({
  width: '16px',
}));
export const StyledIconDateRange = styled(DateRangeIcon)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.secondary,
}));
export const StyledRealTimeUpdateGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(1),
}));
export const StyledDateTodayP = styled('p')(({ theme }) => ({
  fontWeight: 500,
  fontSize: '13px',
  color: theme.palette.text.secondary,
  margin: '0px 0px 6px 6px',
}));
export const StyledDataGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(-3),
  alignItems: 'center',
}));
export const StyledTitleRecP = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '24px',
  color: theme.palette.text.primary,
  margin: theme.spacing(0),
  marginBottom: theme.spacing(4),
}));
export const StyledResultAndInfoGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  borderBottom: '1px dotted rgba(145, 158, 171, 0.15)',
  paddingBottom: theme.spacing(4),
}));
export const StyledGeneratedTodayGrid = styled(Grid)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
export const StyledLast7DayGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(3),
}));
export const StyledResultP = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '20px',
  color: theme.palette.text.primary,
  margin: theme.spacing(0),
}));
export const StyledInfoP = styled('p')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '13px',
  color: theme.palette.text.secondary,
  margin: theme.spacing(0),
}));

export const StyledResultText = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '20px',
  color: theme.palette.text.primary,
  margin: theme.spacing(0),
}));
