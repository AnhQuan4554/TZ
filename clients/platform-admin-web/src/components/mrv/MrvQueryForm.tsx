import type { FC } from 'react';
import { Grid, Stack } from '@mui/material';
import type {
  IMrvApprovedStatus,
  IMrvQuery,
  IMrvStatus,
} from '@tymlez/platform-api-interfaces';
import {
  EnumMrvAprrovedStatus,
  EnumMrvStatus,
  EnumPolicyTags,
} from '@tymlez/common-libs';
import { DateRangeForm, RadioForm, SelectForm } from '@tymlez/frontend-libs';

interface Props {
  query: IMrvQuery;
  onUpdateQuery: (query: IMrvQuery) => void;
}

export const MrvQueryForm: FC<Props> = ({ query, onUpdateQuery }) => {
  const {
    startDateTime: from,
    endDateTime: to,
    isApproved,
    status,
    dataSourceType,
    policyTag,
  } = query;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <DateRangeForm
          from={from ? new Date(from) : null}
          to={to ? new Date(to) : null}
          onUpdateFrom={(value: any) => {
            onUpdateQuery({
              startDateTime: value,
              endDateTime: to,
              status,
              dataSourceType,
              isApproved,
              policyTag,
            });
          }}
          onUpdateTo={(value: any) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: value,
              status,
              dataSourceType,
              isApproved,
              policyTag,
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
        <RadioForm
          title="Status Sent"
          options={Object.entries(EnumMrvStatus).map((enumStatus) => {
            return {
              label: enumStatus[1],
              value: enumStatus[1],
            };
          })}
          value={status}
          onUpdate={(value: IMrvStatus) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: to,
              status: value as IMrvStatus,
              dataSourceType,
              isApproved,
              policyTag,
            });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={1} sx={{ mr: 10 }}>
          <SelectForm
            title="Filter by capture type"
            options={[
              { name: 'Realtime', value: 'realtime' },
              { name: 'Manually', value: 'manually' },
            ]}
            value={dataSourceType}
            onUpdate={(value: string) => {
              onUpdateQuery({
                startDateTime: from,
                endDateTime: to,
                status,
                dataSourceType: value,
                isApproved,
                policyTag,
              });
            }}
            customStyle={{
              '& .select-form > div': {
                background: '#F5F5F5',
              },
            }}
          />
          <SelectForm
            title="Filter by policy tag"
            options={Object.entries(EnumPolicyTags).map((enumPolicy) => {
              return {
                name: enumPolicy[1],
                value: enumPolicy[1],
              };
            })}
            value={policyTag}
            onUpdate={(value: string) => {
              onUpdateQuery({
                startDateTime: from,
                endDateTime: to,
                status,
                dataSourceType,
                isApproved,
                policyTag: value,
              });
            }}
            customStyle={{
              '& .select-form > div': {
                background: '#F5F5F5',
              },
            }}
          />
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <RadioForm
          title="Status Approved"
          options={Object.entries(EnumMrvAprrovedStatus).map((enumApproved) => {
            return {
              label: enumApproved[1],
              value: enumApproved[1],
            };
          })}
          value={isApproved}
          onUpdate={(value: IMrvApprovedStatus) => {
            onUpdateQuery({
              startDateTime: from,
              endDateTime: to,
              status,
              dataSourceType,
              isApproved: value as IMrvApprovedStatus,
              policyTag,
            });
          }}
        />
      </Grid>
    </Grid>
  );
};
