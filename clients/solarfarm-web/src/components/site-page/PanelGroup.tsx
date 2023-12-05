import React, { useState } from 'react';
import type { FC } from 'react';
import { Box, Card, CardHeader, Typography, Grid, Button } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { Loading, CommonTable, StyledTableFooter } from '@tymlez/frontend-libs';
import RefreshIcon from '@mui/icons-material/Refresh';
import { usePanelGroup } from '../../hooks/useVerificationData';
import {
  BorderLinearProgress,
  StyledTableBox,
} from '../device/styles/summaryStyle';

interface Props {
  dataTestId?: string;
}
export const SolarPanelGroup: FC<Props> = ({ dataTestId }) => {
  const [refreshToken, setRefreshToken] = useState('');

  const { data, isLoading } = usePanelGroup(refreshToken);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'SOLAR PANEL ARRAY',
      headerAlign: 'left',
      flex: 200,
      align: 'left',
      renderCell: (params: any) => {
        return (
          <Grid
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <img
              src="/logo/sunny.svg"
              alt="iconEnergy"
              style={{ width: '25px', marginRight: '8px' }}
            />
            <p style={{ margin: '0px' }}>{params.name}</p>
          </Grid>
        );
      },
    },
    {
      field: 'ids',
      headerName: 'PANEL IDS',
      headerAlign: 'left',
      type: 'string',
      flex: 200,
      align: 'left',
      renderCell: (params: any) => {
        return (
          <Grid
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <p style={{ margin: '0px' }}>{params.ids}</p>
          </Grid>
        );
      },
    },
    {
      field: 'generation',
      headerName: 'GENERATION (LAST 5 MINUTES)',
      headerAlign: 'left',
      flex: 200,
      renderCell: (params: any) => {
        return (
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Grid item xs={9}>
              <BorderLinearProgress
                variant="determinate"
                value={params.generationRatio * 100}
              />
            </Grid>
            <Grid item xs={3}>
              {params.generation.toFixed(2)} MWh
            </Grid>
          </Grid>
        );
      },
    },
  ];

  return (
    <Card elevation={12} data-test-id={dataTestId}>
      <CardHeader
        disableTypography
        title={
          <Box>
            <Typography
              data-test-id={`${dataTestId}-header`}
              color="textPrimary"
              variant="h6"
            >
              Solar Panels
            </Typography>
            <p
              data-test-id={`${dataTestId}-subheader`}
              style={{
                fontWeight: 400,
                fontSize: '16px',
                color: '#5C6A82',
                margin: '0px',
              }}
            >
              Generation by array
            </p>
          </Box>
        }
        sx={{
          pb: 0,
        }}
      />
      <StyledTableBox>
        <Box
          sx={{
            width: '100%',
            '& .css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
              backgroundColor: '#A8D973',
            },
            position: 'relative',
          }}
        >
          {isLoading && !data ? (
            <Loading dataTestId={`${dataTestId}-loading`} />
          ) : (
            <>
              <Button
                data-test-id={`${dataTestId}-button-refresh`}
                sx={{ float: 'right' }}
                onClick={() => setRefreshToken(new Date().toISOString())}
                color="info"
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
              <Grid
                sx={{
                  width: {
                    xs: window.innerWidth - 60,
                    sm: window.innerWidth - 150,
                    md: '100%',
                  },
                }}
              >
                <CommonTable
                  dataTestId={`${dataTestId}-common-table`}
                  columns={columns}
                  data={data?.records || []}
                  hideFooter
                  customHeadStyle={{
                    border: 'none',
                    background: '#A8D973',
                    color: '#3A5320',
                  }}
                  customRowStyle={{
                    background: 'unset',
                  }}
                  customCellStyle={{
                    border: 'none',
                    borderBottom: '1px solid #F5F5F5',
                  }}
                />
              </Grid>
            </>
          )}

          <StyledTableFooter dataTestId={`${dataTestId}-footer`} />
        </Box>
      </StyledTableBox>
    </Card>
  );
};
