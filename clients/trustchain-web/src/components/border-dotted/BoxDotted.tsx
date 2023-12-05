import React from 'react';
import { Box } from '@mui/material';

export const BoxDotted = () => {
  return (
    <Box
      sx={{
        height: 1,
        width: '100%',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderStyle: 'dotted',
        my: 3,
      }}
    />
  );
};
