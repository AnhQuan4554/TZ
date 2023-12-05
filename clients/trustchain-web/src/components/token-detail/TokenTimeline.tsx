import type { FC } from 'react';
import React from 'react';
import { Grid } from '@mui/material';
import { TokenTimeline } from '@tymlez/frontend-libs';

interface ITokenTimelineProps {
  data: any;
  dataTestId?: string;
}

export const TokenTimelineComponent: FC<ITokenTimelineProps> = ({
  data,
  dataTestId,
}) => {
  return (
    <Grid sx={{ mt: 4 }}>
      <TokenTimeline data={data} dataTestId={dataTestId} />
    </Grid>
  );
};
