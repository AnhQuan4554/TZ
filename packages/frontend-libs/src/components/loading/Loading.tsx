import { Box, CircularProgress } from '@mui/material';
import type { FC } from 'react';

export interface ILoadingProps {
  style?: any;
  color?: string;
  dataTestId?: string;
}

const Loading: FC<ILoadingProps> = ({ style, color, dataTestId }) => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        ...style,
      }}
      data-test-id={dataTestId}
    >
      <CircularProgress sx={{ m: 2, color }} />
    </Box>
  );
};

export default Loading;
