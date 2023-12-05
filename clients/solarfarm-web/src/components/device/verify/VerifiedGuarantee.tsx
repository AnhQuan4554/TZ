import React, { useState } from 'react';
import type { FC } from 'react';
import { Box, Card, CardHeader, Button, Typography, Grid } from '@mui/material';
import type { IIsoDate, IVpRecord } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import { formatDateTimeTooltip, formatNumber } from '@tymlez/common-libs';
import {
  Loading,
  CustomPagination,
  CommonTable,
  HistoryQuery,
  HistoryQueryText,
  RealtimeQueryText,
  Image,
  StyledTableFooter,
} from '@tymlez/frontend-libs';
import TrustChainLogo from '../../common/logo/TrustChainLogo';
import { VcModal } from './VcModal';
import hederaImage from '../../../../public/verification/Hedera.png';
import { useVerificationData } from '../../../hooks/useVerificationData';
import {
  StyledMainTitleComponentBox,
  StyledTableBox,
} from '../styles/summaryStyle';

interface Props {
  historyQuery: HistoryQuery;
  dataTestId: string;
}

export const VerifiedGuarantee: FC<Props> = ({ historyQuery, dataTestId }) => {
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const [selectedVp, setSelectedVp] = useState<IVpRecord | null>(null);
  const [vpLoading, setVpLoading] = useState<boolean>(false);
  const {
    data,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useVerificationData(from, to);

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
      field: 'mintedDate',
      headerName: 'Date and Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 200,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(new Date(params.mintedDate)),
    },
    {
      field: 'value',
      headerName: 'Energy Value (MW)',
      headerAlign: 'center',
      type: 'number',
      flex: 200,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.value),
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
            <>
              <StyledMainTitleComponentBox>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  data-test-id={`${dataTestId}-title`}
                >
                  REC Certificates
                </Typography>
                <Box
                  data-test-id={`${dataTestId}-hedera-image`}
                  sx={{ width: 120, marginLeft: '8px' }}
                >
                  <Image src={hederaImage} />
                </Box>
              </StyledMainTitleComponentBox>
              {data && data.isRealtime ? (
                <RealtimeQueryText />
              ) : (
                <HistoryQueryText
                  fromDate={new Date(from)}
                  toDate={new Date(to)}
                />
              )}
            </>
          }
          sx={{
            pb: 0,
          }}
        />
        <StyledTableBox>
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
                  customCellStyle={{
                    border: 'none',
                  }}
                />
              </Grid>
              <Box sx={{ marginTop: '32px' }}>
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
        </StyledTableBox>
      </Card>
    </>
  );
};
