import * as React from 'react';
import type { NextPage } from 'next';
import { Card } from '@mui/material';
import type { IMeterTaskQuery } from '@tymlez/platform-api-interfaces';
import { CustomizedMeterTasksTable } from './MeterTasksTable';
import { MeterTasksQueryForm } from './MeterTasksQueryForm';

export const MeterTasksPage: NextPage = () => {
  const [query, setQuery] = React.useState<IMeterTaskQuery>({
    startDateTime: '',
    endDateTime: '',
    status: 'active',
    meterJobId: 'all',
  });

  return (
    <Card sx={{ width: '100%', p: 3 }}>
      <MeterTasksQueryForm query={query} onUpdateQuery={setQuery} />
      <CustomizedMeterTasksTable query={query} />
    </Card>
  );
};
