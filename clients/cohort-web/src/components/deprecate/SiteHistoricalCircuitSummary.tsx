import type { FC } from 'react';
import { Grid } from '@mui/material';
import { sumBy } from 'lodash';
import type { ITenancyDataResult } from '@tymlez/platform-api-interfaces';
import { SiteHistoricalCircuitTable } from '../tv-display-page/tenancy/SiteHistoricalCircuitTable';
import { SiteHistoricalCircuitPieChart } from './SiteHistoricalCircuitPieChart';

interface Props {
  tenancyData?: ITenancyDataResult[];
}

export const SiteHistoricalCircuitSummary: FC<Props> = ({ tenancyData }) => {
  const aggregateFunc = (tenancy: ITenancyDataResult) => {
    const value = sumBy(tenancy.data, (i) => +i.value) as number;
    return { name: tenancy.name, value };
  };

  const data = tenancyData ? tenancyData.map(aggregateFunc) : [];

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <SiteHistoricalCircuitTable data={data} />
      </Grid>
      <Grid item xs={12} md={6} minHeight={350}>
        <SiteHistoricalCircuitPieChart data={data} />
      </Grid>
    </Grid>
  );
};
