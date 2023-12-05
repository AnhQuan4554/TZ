import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Link,
  Typography,
  Grid,
} from '@mui/material';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import { formatDateTimeTooltip, formatNumber } from '@tymlez/common-libs';
import {
  Loading,
  CommonTable,
  VerifiedStyle,
  CustomPagination,
  Image,
} from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useVerificationData } from '../../../hooks/useVerification';
import { VcModal } from './VcModal';
import hederaImage from '../../../../public/Hedera.png';
import dragonGlass from '../../../../public/dragonglass.png';
import verifiedImage from '../../../../public/verified_white.png';

interface Props {
  timezone?: string;
}

export const VerificationTable: FC<Props> = ({ timezone }) => {
  const [refreshToken, setRefreshToken] = useState('');
  const [selectedVp, setSelectedVp] = useState<IVpRecord | null>(null);
  const [vpLoading, setVpLoading] = useState<boolean>(false);
  const classes = VerifiedStyle();

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
      headerName: 'CERTIFICATE ID',
      headerAlign: 'left',
      flex: 70,
      minWidth: 400,
      renderCell: (item: any) => {
        return (
          <Button
            onClick={() => {
              setVpLoading(true);
              setSelectedVp(item);
            }}
          >
            {item.vpId}
          </Button>
        );
      },
    },
    {
      field: 'timestamp',
      headerName: 'DATE AND TIME MINTED',
      headerAlign: 'center',
      type: 'dateTime',
      minWidth: 200,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(
          new Date(params.timestamp),
          'dd MMM HH:mm',
          timezone,
        ),
    },
    {
      field: 'waterPumped',
      headerName: 'WATER PUMPED (kL)',
      headerAlign: 'center',
      type: 'number',
      minWidth: 200,
      align: 'center',
      renderCell: (params: any) =>
        formatNumber(params.waterPumped / 1000 || 0, 4),
    },
    {
      field: 'fuelUsed',
      headerName: 'FUEL USED (L)',
      headerAlign: 'center',
      type: 'number',
      minWidth: 200,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.value || 0, 4),
    },

    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 (ton)',
      headerAlign: 'center',
      type: 'number',
      minWidth: 200,
      flex: 50,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.CO2eqEmissions || 0, 4),
    },
    {
      field: 'onChainUrl',
      headerName: 'VIEW ON-CHAIN',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              width: '100%',
              mt: 1,
            }}
          >
            <Link href={params.onChainUrl} target="_blank" rel="noopener">
              <Image src={dragonGlass} />
            </Link>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    if (vpLoading) {
      setTimeout(() => {
        setVpLoading(false);
      }, 2000);
    }
  }, [vpLoading]);

  return (
    <>
      {selectedVp && !vpLoading && (
        <VcModal
          vpRecord={selectedVp}
          handleClose={() => setSelectedVp(null)}
          timezone={timezone}
        />
      )}

      <Card elevation={12}>
        <CardHeader
          sx={{ pb: 1 }}
          disableTypography
          title={
            <Box className={classes.mainTitleComponent}>
              <Typography color="textPrimary" variant="h6">
                Verification
              </Typography>
              <Box sx={{ width: 120 }}>
                <Image src={hederaImage} />
              </Box>
            </Box>
          }
        />
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <Box
              sx={{
                width: '100%',
                px: 3,
                '& .css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
                  backgroundColor: '#A8D973',
                },
                pointerEvents: vpLoading ? 'none' : 'unset',
                position: 'relative',
              }}
            >
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

              <Button
                sx={{ float: 'right' }}
                onClick={() => setRefreshToken(new Date().toISOString())}
                color="info"
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
              <CommonTable
                columns={columns}
                data={data?.records || []}
                hideFooter
                customHeadStyle={{
                  border: 'none',
                  background: '#A8D973',
                }}
                customCellStyle={{
                  border: 'none',
                }}
              />
              <Box className={classes.paginationStyle}>
                <CustomPagination
                  page={page}
                  count={data ? data.num : 0}
                  pageSize={pageSize}
                  pageSizeList={[5, 10, 15]}
                  handleChangePage={handleChangePage}
                  handleChangePageSize={handleChangeRowsPerPage}
                />
              </Box>
            </Box>
          )}
          <Box className={classes.footerComponent}>
            <Box sx={{ width: 100 }}>
              <Image src={verifiedImage} />
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" className={classes.footerTitle}>
                All data secured by the TYMLEZ platform built on Hedera
                hashgraph
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};
