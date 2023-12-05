import type { FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StyledSearch, StyledSearchIconWrapper, StyledInputBase } from './styled-components';

export interface ISearchProps {
  placeholder?: string;
  customStyle?: any;
  value: string;
  onChange: (value: string) => void;
  dataTestId?: string;
}

export const SearchInput: FC<ISearchProps> = ({
  placeholder,
  customStyle,
  value,
  onChange,
  dataTestId,
}) => {
  return (
    <StyledSearch sx={customStyle} data-test-id={dataTestId}>
      <StyledSearchIconWrapper>
        <SearchIcon sx={{ color: '#989898' }} />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(e) => {
          onChange(e.target.value || '');
        }}
      />
    </StyledSearch>
  );
};
