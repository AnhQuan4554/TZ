import * as React from 'react';
import type { NextPage } from 'next';
import type { IMeterDataAdminQuery } from '@tymlez/platform-api-interfaces';
import { Card } from '@mui/material';
import { CustomizedMeterDataTable } from './MeterDataTable';
import { MeterDataQueryForm } from './MeterDataQueryForm';

export const MeterDataPage: NextPage = () => {
  const [query, setQuery] = React.useState<IMeterDataAdminQuery>({
    startDateTime: '',
    endDateTime: '',
    metricName: 'all',
    exactDateTime: '',
  });

  return (
    <Card sx={{ width: '100%', p: 3 }}>
      <MeterDataQueryForm query={query} onUpdateQuery={setQuery} />

      <CustomizedMeterDataTable query={query} />
    </Card>
  );
};
