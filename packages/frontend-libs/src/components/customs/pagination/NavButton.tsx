import type { FC } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { StyledNavButton } from '../styled-components';

interface Props {
  type: string;
  page: number;
  numberOfPage: number;
  handleChangePage: Function;
}

export const NavButton: FC<Props> = ({ type, page, numberOfPage, handleChangePage }) => {
  const prev: boolean = type === 'Previous';
  return (
    <StyledNavButton
      startIcon={prev ? <ArrowBackIos /> : null}
      endIcon={!prev ? <ArrowForwardIos /> : null}
      onClick={() => handleChangePage(page + (prev ? -1 : 1))}
      disabled={prev ? page === 0 : page === numberOfPage - 1}
    >
      {type}
    </StyledNavButton>
  );
};
