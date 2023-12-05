import { FormLabel, Grid, TextField } from '@mui/material';
import type { FC } from 'react';
import type { IMeterDataAdminQuery } from '@tymlez/platform-api-interfaces';
import { DateRangeForm, SelectForm } from '@tymlez/frontend-libs';
import { useFetchMetricNames } from '../../api/useFetchMeterDataData';

interface Props {
  query: IMeterDataAdminQuery;
  onUpdateQuery: (query: IMeterDataAdminQuery) => void;
}

export const MeterDataQueryForm: FC<Props> = ({ query, onUpdateQuery }) => {
  const {
    startDateTime: from,
    endDateTime: to,
    metricName,
    exactDateTime,
  } = query;
  const { data: metricNames = [] } = useFetchMetricNames();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <DateRangeForm
          from={from ? new Date(from) : null}
          to={to ? new Date(to) : null}
          onUpdateFrom={(value: any) => {
            onUpdateQuery({
              startDateTime: value,
              endDateTime: to,
              metricName,
              exactDateTime,
            });
          }}
          onUpdateTo={(value: any) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: value,
              metricName,
              exactDateTime,
            });
          }}
        />
      </Grid>

      <Grid item xs={3} sx={{ marginTop: '-4px' }}>
        <SelectForm
          title="Filter by metric name"
          options={metricNames.map((metric) => {
            return {
              name: metric,
              value: metric,
            };
          })}
          value={metricName}
          onUpdate={(value: string) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: to,
              metricName: value,
              exactDateTime,
            });
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <FormLabel component="legend">Filter by date time</FormLabel>
        <TextField
          required
          fullWidth
          id="txtDatetime"
          sx={{ marginTop: '7px' }}
          name="datetime"
          margin="normal"
          value={exactDateTime}
          onChange={(e) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: to,
              metricName,
              exactDateTime: e.target.value,
            });
          }}
        />
      </Grid>
    </Grid>
  );
};
