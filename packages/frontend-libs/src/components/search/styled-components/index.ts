import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';

export const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 61,
  backgroundColor: '#F5F5F5',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: '55px',
  display: 'flex',
}));

export const StyledSearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#989898',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
