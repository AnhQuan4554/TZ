import type { FC } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { IStep, Step } from './Step';

export interface IProcessStepsProps {
  title: string;
  steps: IStep[];
  dataTestId?: string;
}

export const ProcessSteps: FC<IProcessStepsProps> = ({ title, steps, dataTestId }) => {
  return (
    <Box pt={2} data-test-id={dataTestId}>
      <Typography data-test-id={`${dataTestId}-title`} variant="h6" color="#293343">
        {title}
      </Typography>

      <Stack spacing={3}>
        {steps.map((step) => (
          <Step dataTestId={dataTestId} key={step.title} {...step} />
        ))}
      </Stack>
    </Box>
  );
};
