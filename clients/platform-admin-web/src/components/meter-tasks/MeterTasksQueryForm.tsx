import { Grid } from '@mui/material';
import type { FC } from 'react';
import type {
  IMeterTaskQuery,
  IMeterTaskStatus,
} from '@tymlez/platform-api-interfaces';
import { DateRangeForm, RadioForm, SelectForm } from '@tymlez/frontend-libs';
import { EnumMeterTaskStatus } from '@tymlez/common-libs';
import { useFetchMeterJobsData } from '../../api/useFetchMeterJobsData';

interface Props {
  query: IMeterTaskQuery;
  onUpdateQuery: any;
}

export const MeterTasksQueryForm: FC<Props> = ({ query, onUpdateQuery }) => {
  const meterJobsData = useFetchMeterJobsData();

  const { startDateTime: from, endDateTime: to, meterJobId, status } = query;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DateRangeForm
              from={from ? new Date(from) : null}
              to={to ? new Date(to) : null}
              onUpdateFrom={(value) => {
                onUpdateQuery({
                  startDateTime: value,
                  endDateTime: to,
                  status,
                  meterJobId,
                });
              }}
              onUpdateTo={(value) => {
                onUpdateQuery({
                  startDateTime: from,
                  endDateTime: value,
                  status,
                  meterJobId,
                });
              }}
              customStyle={{
                '& .start-date-time > div': {
                  background: '#F5F5F5',
                },
                '& .end-date-time > div': {
                  background: '#F5F5F5',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectForm
              title="Filter by meter job"
              options={
                meterJobsData
                  ? meterJobsData.data.map((meterJob) => {
                      return {
                        name: meterJob.name,
                        value: meterJob.id,
                      };
                    })
                  : []
              }
              value={meterJobId}
              onUpdate={(value: string) => {
                onUpdateQuery({
                  startDateTime: from,
                  endDateTime: to,
                  status,
                  meterJobId: value,
                });
              }}
              customStyle={{
                '& .select-form > div': {
                  background: '#F5F5F5',
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <RadioForm
          title="Status"
          options={Object.entries(EnumMeterTaskStatus).map((enumStatus) => {
            return {
              label: enumStatus[0],
              value: enumStatus[1],
            };
          })}
          value={status}
          onUpdate={(value: IMeterTaskStatus) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: to,
              status: value as IMeterTaskStatus,
              meterJobId,
            });
          }}
        />
      </Grid>
    </Grid>
  );
};
