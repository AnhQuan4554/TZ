import { keyBy, round } from 'lodash';
import type { FC } from 'react';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Loading, HistoryQuery } from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { formatNumber } from '@tymlez/common-libs';
import { useCarbonFootprintData } from '../../hooks/useCarbonFootprintData';

interface Props {
  historyQuery: HistoryQuery;
  dataTestId?: string;
}

export const AverageNetCO2eq: FC<Props> = ({ historyQuery, dataTestId }) => {
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const { data, isLoading } = useCarbonFootprintData(from, to);
  const metrics = keyBy(data || [], 'name');
  const pigIron = metrics.pigIron?.value || 0;
  const carbon = metrics.carbon?.value || 0;
  const abatement = metrics.abatement?.value || 0;
  const net = carbon - abatement;
  const footprint = pigIron > 0 ? round(net / 1000 / pigIron, 4) : 0;

  return (
    <Stack
      direction="column"
      spacing={5}
      style={{ height: '100%' }}
      data-test-id={dataTestId}
    >
      <Card elevation={12} sx={{ p: 3, height: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              data-test-id={`${dataTestId}-title`}
              style={{
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
                color: '#293343',
              }}
            >
              Average Net CO2eq per Tonne of Pig Iron
            </Typography>
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                marginBottom: '91px',
                marginTop: '126px',
              }}
            >
              <Grid data-test-id={`${dataTestId}-image-carbon`}>
                <img
                  alt="carbon_icon"
                  style={{
                    width: 57,
                  }}
                  src="logo/carbon.svg"
                />
              </Grid>
              <Grid data-test-id={`${dataTestId}-image-row`}>
                <img
                  alt="row_icon"
                  style={{
                    width: 57,
                  }}
                  src="logo/row.svg"
                />
              </Grid>
              <Grid data-test-id={`${dataTestId}-image-stone`}>
                <img
                  alt="stone_icon"
                  style={{
                    width: 57,
                  }}
                  src="logo/stone.svg"
                />
              </Grid>
            </Grid>
            {!isLoading ? (
              <Typography
                data-test-id={`${dataTestId}-value`}
                sx={{
                  fontSize: '48px',
                  fontWeight: 500,
                  lineHeight: '72px',
                  color: '#293343',
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {formatNumber(footprint)} t
              </Typography>
            ) : (
              <Loading />
            )}
            <Typography
              data-test-id={`${dataTestId}-label`}
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
                color: '#5C6A82',
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              CO2eq per tonne of pig iron
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
