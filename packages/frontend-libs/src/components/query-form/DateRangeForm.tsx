import type { FC } from 'react';
import { Stack, TextField, FormLabel, Grid } from '@mui/material';
import { DesktopDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export interface IDateRangeFormProps {
  from: Date | null;
  to: Date | null;
  onUpdateFrom: (value: string) => void;
  onUpdateTo: (to: string) => void;
  dataTestId?: string;
  customStyle?: any;
}

export const DateRangeForm: FC<IDateRangeFormProps> = ({
  from,
  to,
  onUpdateFrom,
  onUpdateTo,
  dataTestId,
  customStyle,
}) => {
  const convertDateToString = (value: Date | null) => {
    return value ? value.toISOString() : '';
  };

  return (
    <Grid data-test-id={dataTestId} sx={customStyle}>
      <FormLabel component="legend" sx={{ mb: 1 }}>
        Filter by date range
      </FormLabel>
      <Stack direction="row" spacing={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDateTimePicker
            className="start-date-time"
            renderInput={(params) => <TextField {...params} />}
            label="Start Date Time"
            value={from}
            onChange={(newValue) => {
              onUpdateFrom(convertDateToString(newValue));
            }}
          />

          <DesktopDateTimePicker
            className="end-date-time"
            renderInput={(params) => <TextField {...params} />}
            label="End Date Time"
            value={to}
            onChange={(newValue) => {
              onUpdateTo(convertDateToString(newValue));
            }}
          />
        </LocalizationProvider>
      </Stack>
    </Grid>
  );
};
