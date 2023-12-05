import { useState } from 'react';
import type { FC } from 'react';
import { Box, Card, CardHeader, Button, Typography, Grid } from '@mui/material';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import { formatDateTimeTooltip, formatNumber } from '@tymlez/common-libs';
import {
  Loading,
  CustomPagination,
  CommonTable,
  StyledTableFooter,
} from '@tymlez/frontend-libs';
import RefreshIcon from '@mui/icons-material/Refresh';
import { VcModal } from './VcModal';
import { Image } from '../../../utils/Image';
import hederaImage from '../../../../public/verification/Hedera.png';
import { useVerificationData } from '../../../hooks/useVerificationData';
import {
  StyledMainTitleComponentBox,
  StyledTableStyleBox,
} from './styled-components';
import TrustChainLogo from '../../common/logo/TrustChainLogo';

interface Props {
  dataTestId: string;
}

export const VerifiedGuarantee: FC<Props> = ({ dataTestId }) => {
  const [selectedVp, setSelectedVp] = useState<IVpRecord | null>(null);
  const [vpLoading, setVpLoading] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState('');

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
            {item.vpId}
          </Button>
        );
      },
    },
    {
      field: 'value',
      headerName: 'H2 Produced (t)',
      headerAlign: 'center',
      flex: 100,
      type: 'number',
      align: 'center',
      renderCell: (params: any) => formatNumber(params.value || 0, 2),
    },
    {
      field: 'greenEnergyValue',
      headerName: 'Renewable Energy (kWh)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) =>
        formatNumber(params.greenEnergyValue || 0, 2),
    },
    {
      field: 'gridEnergyValue',
      headerName: 'Grid Energy (kWh)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.gridEnergyValue || 0, 2),
    },
    {
      field: 'energyValue',
      headerName: 'Total Energy (kWh)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.energyValue || 0, 2),
    },
    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 Produced (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.CO2eqEmissions || 0, 2),
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
      headerName: 'VIEW TYMLEZ TRUST CHAIN',
      headerAlign: 'center',
      flex: 50,
      align: 'center',
      renderCell: (params: any) => {
        const id = params.messageId;

        return (
          <Box
            sx={{ width: '100px', margin: 'auto', mt: 1, cursor: 'pointer' }}
            onClick={() => {
              window.open(`/trustchain/token/?id=${id}`, '_blank');
            }}
          >
            <TrustChainLogo />
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
                color="textPrimary"
                variant="h6"
                data-test-id={`${dataTestId}-title`}
              >
                Verified Guarantee of Origin
              </Typography>
              <Box
                sx={{ width: 120, ml: 1 }}
                data-test-id={`${dataTestId}-hedera-image`}
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
                    xs: window.innerWidth - 60,
                    sm: window.innerWidth - 170,
                    md: window.innerWidth - 150,
                    lg: '100%',
                    xl: '100%',
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
                  }}
                  customCellStyle={{
                    border: 'none',
                  }}
                />
              </Grid>
              <Box sx={{ mt: 4 }}>
                <CustomPagination
                  dataTestId={`${dataTestId}-pagination`}
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
          <StyledTableFooter dataTestId={`${dataTestId}-footer`} />
        </StyledTableStyleBox>
      </Card>
    </>
  );
};
