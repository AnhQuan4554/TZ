import { Card, Grid, Stack, Typography } from '@mui/material';
import { Loading, TrendPercent } from '@tymlez/frontend-libs';
import type { FC } from 'react';
import { round } from 'lodash';
import { formatNumber } from '../../../utils/number';
import type { ISummaryItem } from '../../../hooks/useSummaryData';
import { hydrogenFootPrintStyles } from './styles/hydrogenFootPrintStyles';

interface Props {
  data: ISummaryItem[];
  dataTestId?: string;
}
export const HydrogenFootprint: FC<Props> = ({ data, dataTestId }) => {
  const classes = hydrogenFootPrintStyles();

  const co2Produced = data.find(
    (x) => x.name === 'totalCarbonEmission',
  ) as ISummaryItem;

  const hydrogen = data.find(
    (x) => x.name === 'deliveredHydrogen',
  ) as ISummaryItem;

  const currentValue = round(
    (co2Produced && co2Produced.value / hydrogen.value) || 0,
    4,
  );
  const preValue = round(
    (co2Produced && co2Produced.preValue / hydrogen.preValue) || 0,
    4,
  );

  return (
    <Stack direction="column" spacing={5} style={{ height: '460px' }}>
      <Card elevation={12} sx={{ p: 3, height: '100%' }}>
        <Grid xs={12} data-test-id={dataTestId}>
          <Typography
            data-test-id={`${dataTestId}-header`}
            className={classes.headingComponent}
          >
            Carbon Intensity
          </Typography>
          <Grid
            className={classes.imgComponent}
            data-test-id={`${dataTestId}-image`}
          >
            <img
              src="icons/compressedAirH2.svg"
              alt="h2_compressed"
              style={{ width: '120px' }}
            />
          </Grid>

          {currentValue ? (
            <Grid item xs={12} className={classes.jcCenter}>
              <Typography
                className={classes.productionValue}
                data-test-id={`${dataTestId}-value`}
              >
                {formatNumber(currentValue)} {co2Produced.uom}
              </Typography>
              <TrendPercent
                value={currentValue}
                preValue={preValue}
                dataTestId={`${dataTestId}-trend-percent`}
              />
            </Grid>
          ) : (
            <Loading dataTestId={`${dataTestId}-loading`} />
          )}
          <Typography
            data-test-id={`${dataTestId}-footer`}
            className={classes.txtHydrogenFooter}
          >
            CO2eq per kilogram of hydrogen
          </Typography>
        </Grid>
      </Card>
    </Stack>
  );
};
