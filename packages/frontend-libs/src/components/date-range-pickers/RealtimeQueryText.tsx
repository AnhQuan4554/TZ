import { Grid } from '@mui/material';
import type { FC } from 'react';
import { StyledDataRangeIcon, StyledDataRangeTypography } from './styled-components';

export interface IHistoryQueryTextProps {
  customStyle?: any;
}

export const RealtimeQueryText: FC<IHistoryQueryTextProps> = ({ customStyle }) => {
  return (
    <Grid style={{ display: 'flex', alignItems: 'end', ...customStyle }}>
      <StyledDataRangeIcon />
      <StyledDataRangeTypography>Realtime</StyledDataRangeTypography>
    </Grid>
  );
};
