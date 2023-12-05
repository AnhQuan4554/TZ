import type { NextPage } from 'next';
import React from 'react';
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import Head from 'next/head';
import { AuthGuard } from '@tymlez/frontend-libs';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { useMicroserviceQueryData, useQueryData } from '../../api/useQuery';

export const SitePage: NextPage = () => {
  const { data } = useQueryData();
  const { data: microData } = useMicroserviceQueryData();
  return (
    <>
      <Head>
        <title>TYMLEZ Carbon Footprint for XXX</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          py: 16,
        }}
        // justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h1"> Dashboard for Client XXX</Typography>
        <Stack direction="row" spacing={5}>
          <Card elevation={12}>
            <List>
              {Object.entries(data || {}).map(([key, value]) => (
                <ListItem key={key} value={value}>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        variant="subtitle1"
                        style={{ color: '#92d050' }}
                      >
                        {key}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="subtitle1">{value}</Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
          <Card elevation={12} sx={{ width: '50%' }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" style={{ color: '#92d050' }}>
                  {microData && microData[0]}
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography variant="subtitle1" style={{ color: '#92d050' }}>
                  {microData && microData[1]}
                </Typography>
              }
            />
          </Card>
        </Stack>
      </Box>
    </>
  );
};

SitePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);
