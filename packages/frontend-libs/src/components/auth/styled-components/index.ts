import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const StyledAccountButtonBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
  padding: '9px 10px',
  gap: '10px',
  background: '#F4F5F7',
  borderRadius: '2px',
  width: 'auto',
  height: '55px',
  justifyContent: 'flex-start',
}));

export const StyledAvatar = styled(Avatar)(() => ({
  height: 40,
  width: 40,
  display: 'flex',
}));

export const StyledUserNameGrid = styled(Avatar)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  background: 'unset',
  width: 'max-content',
}));

export const StyledArrowDropUp = styled(ArrowDropUpIcon)(() => ({
  width: '24px',
  height: '24px',
  color: '#293343',
}));

export const StyledArrowDropDown = styled(ArrowDropDownIcon)(() => ({
  width: '24px',
  height: '24px',
  color: '#293343',
}));

export const StyledAccountPopoverBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  padding: theme.spacing(2),
  display: 'flex',
}));

export const StyledDefaultAccountDiv = styled(Typography)({
  width: '100%',
  backgroundColor: 'rgb(240 247 254)',
  display: 'flex',
  height: '50px',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '10px',
  marginTop: '12px',
});
