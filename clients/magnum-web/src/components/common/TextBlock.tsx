import type { FC } from 'react';
import { Card, Stack } from '@mui/material';

interface Props {
  dataTestId?: string;
}

export const TextBlock: FC<Props> = ({ dataTestId }) => {
  return (
    <Stack
      direction="column"
      spacing={5}
      style={{ height: '100%' }}
      data-test-id={dataTestId}
    >
      <Card elevation={12} sx={{ p: 3, height: '100%' }}>
        The HIsmelt production data used in this digital twin was provided by
        MGU. The data is simulated, has not been third party audited, and does
        not directly align with any existing carbon or guarantee of origin
        standard.The information contained and accessed on this site is provided
        for demonstrator purposes only and is not intended to replace or serve
        as a substitute for any type of audit.
      </Card>
    </Stack>
  );
};
