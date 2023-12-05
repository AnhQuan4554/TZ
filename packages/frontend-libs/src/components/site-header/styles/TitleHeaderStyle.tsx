import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const StyledArrowDropUpIcon = styled(ArrowDropUpIcon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

export const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

export const StyledHeadingTopTypography = styled(Typography)(({ theme }) => ({
  fontSize: '32px !important',
  lineHeight: '32px',
  color: '#42526E',
  fontWeight: 400,
  marginRight: '12px',
  [theme.breakpoints.down('md')]: {
    fontSize: '25px !important',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(426)]: {
    fontSize: '18px !important',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(325)]: {
    fontSize: '18px !important',
    lineHeight: '50px',
  },
}));

export const StyledSelectSiteText = styled('u')(({ theme }) => ({
  fontSize: '32px !important',
  lineHeight: '32px',
  color: '#75A640',
  fontWeight: 700,
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    fontSize: '25px !important',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(426)]: {
    fontSize: '18px !important',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(325)]: {
    fontSize: '18px !important',
    lineHeight: '50px',
  },
}));

export const StickyTitleHeader = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '90px',
  width: '100%',
  backgroundColor: '#f9fafc',
  zIndex: 99,
  position: 'sticky',
  top: '91px',
  padding: '24px',
  [theme.breakpoints.down(426)]: {
    display: 'block',
    flexDirection: 'row',
    position: 'fixed',
    height: '135px',
    maxWidth: '100%',
    backgroundColor: '#f9fafc',
    zIndex: 99,
    paddingTop: '30px',
  },
}));
