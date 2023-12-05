import type { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { formatNumber } from '@tymlez/common-libs';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';

export interface IStepLine {
  icon: string;
  label: string;
  value: number;
  uom: string;
  dataTestId?: string;
}

export const StepLine: FC<IStepLine> = ({ icon, label, uom, value, dataTestId }) => {
  const testTitle = label.toLowerCase().replaceAll(' ', '-');
  const updatedDataTestId = `${dataTestId}-${testTitle}`;
  const isSmallScreen = useBreakpoint('sm', 'down');

  if (!isSmallScreen) {
    return (
      <Grid container spacing={2} key={label} data-test-id={updatedDataTestId}>
        <Grid item xs="auto">
          <Grid
            data-test-id={`${updatedDataTestId}-icon`}
            style={{
              paddingLeft: '8px',
            }}
          >
            <img src={icon} alt="icon" />
          </Grid>
        </Grid>
        <Grid item xs="auto">
          <Typography
            data-test-id={`${updatedDataTestId}-title`}
            display="inline-block"
            sx={{ marginRight: '16px' }}
          >
            {label} :
          </Typography>
          <Typography
            data-test-id={`${updatedDataTestId}-value`}
            display="inline"
            variant="h5"
            style={{ fontWeight: 600 }}
          >
            {formatNumber(value)} {uom}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container key={label} sx={{ marginBottom: '16px' }} data-test-id={updatedDataTestId}>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', marginBottom: '8px' }}
        data-test-id={`${updatedDataTestId}-icon`}
      >
        <img src={icon} alt="icon" style={{ marginRight: '8px' }} />
        <Typography
          data-test-id={`${updatedDataTestId}-title`}
          display="inline-block"
          sx={{ marginRight: '8px' }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginLeft: '24px' }}>
        <Typography
          data-test-id={`${updatedDataTestId}-value`}
          display="inline"
          variant="h5"
          style={{ fontWeight: 600 }}
        >
          {formatNumber(value)} {uom}
        </Typography>
      </Grid>
    </Grid>
  );
};
