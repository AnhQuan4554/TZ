import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart } from './LineChart';
import {
  StyledFullHeightDFlexCard,
  StyledLineStyledChartBox,
  StyledOverviewGenerationCardContent,
} from './styled-components';

export interface IOverviewGenerationProps {
  data: number;
  series: { data: any }[];
  dataTestId?: string;
}

const OverviewGeneration: FC<IOverviewGenerationProps> = ({ data, series, dataTestId }) => {
  return (
    <StyledFullHeightDFlexCard data-test-id={dataTestId} elevation={12}>
      <StyledOverviewGenerationCardContent>
        {!data ? (
          'Loading...'
        ) : (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
            }}
          >
            <div>
              <Typography color="primary" variant="subtitle2">
                NEXT 24 HOUR GENERATION (FORECAST)
              </Typography>
              <Typography color="textPrimary" sx={{ mt: 1 }} variant="h5">
                {data ? data?.toFixed(2) : 0} kWh
              </Typography>
            </div>
            <StyledLineStyledChartBox>
              <LineChart data={series} color="#6cc261" width={120} />
            </StyledLineStyledChartBox>
          </Box>
        )}
      </StyledOverviewGenerationCardContent>
    </StyledFullHeightDFlexCard>
  );
};

export default OverviewGeneration;
