import { Grid } from '@mui/material';
import type { FC } from 'react';
import { StyledDataRangeIcon, StyledDataRangeTypography } from './styled-components';

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

export interface IHistoryQueryTextProps {
  fromDate: any;
  toDate: any;
  customStyle?: any;
  dataTestId?: any;
}

export const HistoryQueryText: FC<IHistoryQueryTextProps> = ({
  fromDate,
  toDate,
  customStyle,
  dataTestId,
}) => {
  let newToDate = new Date(toDate || '');
  const toDateMls = newToDate.getTime() - 86340000;
  newToDate = new Date(toDateMls);
  return (
    <Grid style={{ display: 'flex', alignItems: 'end', ...customStyle }} data-test-id={dataTestId}>
      <StyledDataRangeIcon />
      <StyledDataRangeTypography>
        {fromDate && monthNames[fromDate.getMonth()].substring(0, 3)}{' '}
        {fromDate && fromDate.getDate()}, {fromDate && fromDate.getFullYear()} -{' '}
        {newToDate && monthNames[newToDate.getMonth()].substring(0, 3)}{' '}
        {newToDate && newToDate.getDate()}, {newToDate && newToDate.getFullYear()}
      </StyledDataRangeTypography>
    </Grid>
  );
};
