import type { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { IStepLine, StepLine } from './StepLine';

export interface IStep {
  title: string;
  icon: string;
  lines: IStepLine[];
  dataTestId?: string;
}

export const Step: FC<IStep> = ({ title, icon, lines, dataTestId }) => {
  const testTitle = title.toLowerCase().replaceAll(' ', '-');
  const updatedDataTestId = `${dataTestId}-${testTitle}`;
  return (
    <Grid data-test-id={updatedDataTestId}>
      <Box
        mt={2}
        pt={3}
        sx={{
          borderTop: '1px dashed #ECECEC',
          display: 'flex',
          flex: 1,
        }}
      >
        <Grid data-test-id={`${updatedDataTestId}-icon`} sx={{ marginRight: '24px' }}>
          <img src={icon} alt="icon" />
        </Grid>
        <Grid sx={{ width: '100%' }}>
          <Typography data-test-id={`${updatedDataTestId}-title`} variant="h6">
            {title}
          </Typography>

          <Box p={1} bgcolor="#F8F8F8" mt={2} sx={{ borderLeft: 2, borderColor: '#75A640' }}>
            {lines.map((stepLine) => (
              <StepLine dataTestId={updatedDataTestId} key={stepLine.label} {...stepLine} />
            ))}
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};
