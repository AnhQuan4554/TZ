import React, { useState } from 'react';
import type { FC } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Button,
  Typography,
  Link,
  Grid,
} from '@mui/material';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import { formatDateTimeTooltip } from '@tymlez/common-libs';
import { Loading, CommonTable, Image } from '@tymlez/frontend-libs';
import RefreshIcon from '@mui/icons-material/Refresh';
import { VcModal } from './VcModal';
import dragonGlass from '../../../../public/dragonglass.png';
import hederaImage from '../../../../public/verification/Hedera.png';
import { useVerificationData } from '../../../hooks/useVerificationData';
import {
  StyledMainTitleComponentBox,
  StyledTableStyleBox,
} from '../styled-components';

interface Props {
  dataTestId: string;
}
export const VerifiedGuarantee: FC<Props> = ({ dataTestId }) => {
  const [selectedVp, setSelectedVp] = useState<IVpRecord | null>(null);
  const [refreshToken, setRefreshToken] = useState('');
  const [vpLoading, setVpLoading] = useState<boolean>(false);

  const {
    data,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useVerificationData(refreshToken);

  const columns: GridColDef[] = [
    {
      field: 'vpId',
      headerName: 'Certificate ID',
      headerAlign: 'left',
      flex: 200,
      align: 'left',
      renderCell: (item: any) => {
        return (
          <Button
            onClick={() => {
              setVpLoading(true);
              setSelectedVp(item);
            }}
          >
            {item.vpId || item.certificateId}
          </Button>
        );
      },
    },
    {
      field: 'value',
      headerName: 'Pig Iron Produced (t)',
      headerAlign: 'center',
      flex: 100,
      type: 'number',
      align: 'center',
      renderCell: (params: any) => (params.value ? params.value.toFixed(5) : 0),
    },
    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 Emissions (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) =>
        params.CO2eqEmissions ? params.CO2eqEmissions.toFixed(5) : 0,
    },

    {
      field: 'CO2eqEmissionsReduction',
      headerName: ' CO2 Offset (t)',
      headerAlign: 'center',
      flex: 100,
      type: 'number',
      align: 'center',
      renderCell: (params: any) =>
        params.CO2eqEmissionsReduction
          ? params.CO2eqEmissionsReduction.toFixed(5)
          : 0,
    },
    {
      field: 'CO2NetOffset',
      headerName: ' Net CO2 Emissions (t)',
      headerAlign: 'center',
      flex: 100,
      type: 'number',
      align: 'center',
      renderCell: (params: any) =>
        (params.CO2eqEmissions - params.CO2eqEmissionsReduction).toFixed(5),
    },
    {
      field: 'timestamp',
      headerName: 'Date and Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(new Date(params.timestamp)),
    },
    {
      field: 'onChainUrl',
      headerName: 'VIEW ON-CHAIN',
      headerAlign: 'center',
      flex: 50,
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Box sx={{ width: '100px', margin: 'auto', mt: 1 }}>
            <Link href={params.onChainUrl} target="_blank" rel="noopener">
              <Image src={dragonGlass} />
            </Link>
          </Box>
        );
      },
    },
  ];

  let tableHeight = '0px';
  switch (pageSize) {
    case 5:
      tableHeight = '400px';
      break;
    case 10:
      tableHeight = '950px';
      break;
    case 15:
      tableHeight = '1341px';
      break;
  }

  return (
    <>
      {selectedVp && (
        <VcModal
          dataTestId={`${dataTestId}-vc-modal`}
          vpRecord={selectedVp}
          handleLoading={(status) => setVpLoading(status)}
          handleClose={() => setSelectedVp(null)}
        />
      )}

      <Card elevation={12} data-test-id={dataTestId}>
        <CardHeader
          disableTypography
          title={
            <StyledMainTitleComponentBox>
              <Typography
                data-test-id={`${dataTestId}-title`}
                color="textPrimary"
                variant="h6"
              >
                Verified Guarantee of Origin
              </Typography>
              <Box
                data-test-id={`${dataTestId}-hedera-image`}
                sx={{ width: 120, ml: 1 }}
              >
                <Image src={hederaImage} />
              </Box>
            </StyledMainTitleComponentBox>
          }
          sx={{
            pb: 0,
          }}
        />

        <StyledTableStyleBox>
          {isLoading && !data ? (
            <Grid
              style={{
                width: '100%',
                height: tableHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loading dataTestId={`${dataTestId}-loading`} />
            </Grid>
          ) : (
            <Box
              sx={{
                width: '100%',
                '& .css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
                  backgroundColor: '#A8D973',
                },
                pointerEvents: vpLoading ? 'none' : 'unset',
                position: 'relative',
              }}
            >
              <Button
                data-test-id={`${dataTestId}-button-refresh`}
                sx={{ float: 'right' }}
                onClick={() => setRefreshToken(new Date().toISOString())}
                color="info"
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
              {vpLoading && (
                <Grid
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'rgb(224, 224, 224)',
                    opacity: 0.5,
                  }}
                >
                  <Loading
                    style={{ position: 'absolute', top: '50%', left: '50%' }}
                  />
                </Grid>
              )}
              <Grid
                sx={{
                  width: {
                    xs: window.innerWidth - 90,
                    sm: window.innerWidth - 170,
                    md: '100%',
                  },
                }}
              >
                <CommonTable
                  dataTestId={`${dataTestId}-common-table`}
                  columns={columns}
                  data={data?.records || []}
                  customHeadStyle={{
                    border: 'none',
                    background: '#A8D973',
                  }}
                  customCellStyle={{
                    border: 'none',
                  }}
                  // hideFooter
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  count={data?.num || 0}
                  page={page}
                  pageSize={pageSize}
                  colSpan={14}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Grid>
            </Box>
          )}
        </StyledTableStyleBox>
      </Card>
    </>
  );
};
