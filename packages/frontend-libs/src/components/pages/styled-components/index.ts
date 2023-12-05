import { styled } from '@mui/material/styles';
import { Box, ListItem, ListItemText } from '@mui/material';

export const StyledForbiddenBox = styled(Box)(() => ({
  alignItems: 'center',
  backgroundColor: 'background.paper',
  display: 'flex',
  minHeight: '100%',
  padding: '0 24px',
  flexGrow: 1,
}));

export const StyledBackButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(6),
}));

export const StyledNotFoundBox = styled(Box)(() => ({
  alignItems: 'center',
  backgroundColor: 'background.paper',
  display: 'flex',
  flexGrow: 1,
  padding: '80px 0',
}));

export const StyledListItem = styled(ListItem)(() => ({
  display: 'flex',
  height: '48px',
  padding: '12px',
  borderRadius: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  marginBottom: '16px',
  '& > div:hover': {
    background: 'unset !important',
  },
  '&:hover': {
    backgroundColor: 'rgba(146, 208, 80, 0.2)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(146, 208, 80, 0.5)',
  },
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  marginLeft: '-50px',
  marginTop: theme.spacing(1),
  '& > span': {
    color: theme.palette.text.primary,
    fontWeight: '500',
    fontSize: '16px',
  },
}));

export const StyledUnauthorisedBox = styled(Box)(() => ({
  alignItems: 'center',
  backgroundColor: 'background.paper',
  display: 'flex',
  flexGrow: 1,
  py: '80px',
}));
