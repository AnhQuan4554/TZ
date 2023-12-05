import { Box } from '@mui/material';
import type { NextPage } from 'next';
import React from 'react';
import { UpdateClientForm } from './UpdateClientForm';

export const ClientPage: NextPage = () => {
  return (
    <Box
      sx={{ marginTop: 12, width: '100%' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UpdateClientForm />
    </Box>
  );
};
