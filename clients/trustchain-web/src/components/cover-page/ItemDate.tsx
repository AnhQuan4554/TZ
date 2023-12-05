import type { FC } from 'react';
import type { HistoryQuery } from '@tymlez/frontend-libs';
import { format } from 'date-fns';
import { StyledDateChooseText, StyledDateGrid } from './styled-components';

interface Props {
  date: HistoryQuery;
}

export const ItemDate: FC<Props> = ({ date }) => {
  const dateFrom = format(new Date(date.dateRange[0] || ''), 'dd/MM/yyyy');
  const dateTo = format(new Date(date.dateRange[1] || ''), 'dd/MM/yyyy');

  return (
    <StyledDateGrid>
      <StyledDateChooseText>{`${dateFrom} -> ${dateTo}`}</StyledDateChooseText>
    </StyledDateGrid>
  );
};
