import type { FC } from 'react';
import { StyledDateRangeTypography } from '../styled-components';

interface Props {
  fromDate: Date;
  toDate: Date;
  dataTestId?: string;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const CustomDateRangeText: FC<Props> = ({ fromDate, toDate, dataTestId }) => {
  return (
    <StyledDateRangeTypography data-test-id={dataTestId}>
      {fromDate && fromDate.getDate()} {fromDate && monthNames[fromDate.getMonth()].substring(0, 3)}{' '}
      {fromDate && fromDate.getFullYear()} - {toDate && toDate.getDate()}{' '}
      {toDate && monthNames[toDate.getMonth()].substring(0, 3)} {toDate && toDate.getFullYear()}
    </StyledDateRangeTypography>
  );
};
