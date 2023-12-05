import type React from 'react';
import type { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import _ from 'lodash';
import { StyledTotalWidgetCard, StyledTotalWidgetBox } from './styled-components';

export interface ITotalWidgetProps {
  title: React.ReactNode | string;
  last30d?: number;
  last24h?: number;
  isLoading: boolean;
  sx?: React.CSSProperties;
  dataTestId?: string;
}

export const TotalWidget: FC<ITotalWidgetProps> = ({
  title,
  last30d,
  last24h,
  isLoading,
  sx,
  dataTestId,
}) => {
  return (
    <StyledTotalWidgetCard data-test-id={dataTestId} elevation={12}>
      <StyledTotalWidgetBox
        sx={{
          ...sx,
        }}
      >
        {isLoading ? (
          'Loading...'
        ) : (
          <Box sx={{ width: '100%' }}>
            <Typography color="primary" variant="subtitle2">
              {title}
            </Typography>
            <Grid container>
              <Grid item xs={8} sm={8} md={8} xl={9}>
                <Typography color="white" variant="caption" style={{ display: 'flex' }}>
                  .
                </Typography>
                <Typography color="textPrimary" variant="h5" style={{ display: 'flex' }}>
                  <div>{_.round(last24h ?? 0, 2).toLocaleString('en-US')} kg</div>
                </Typography>
                <Typography color="textSecondary" variant="caption" style={{ display: 'flex' }}>
                  last 30 days
                </Typography>
                <Typography color="textSecondary" variant="h6" style={{ display: 'flex' }}>
                  {_.round(last30d ?? 0, 2).toLocaleString('en-US')} kg
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </StyledTotalWidgetBox>
    </StyledTotalWidgetCard>
  );
};
