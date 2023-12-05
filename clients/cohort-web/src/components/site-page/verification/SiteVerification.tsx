import { useEffect, useState } from 'react';
import type { FC } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Button,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import type { IIsoDate, IVpRecord } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import { formatDateTimeTooltip, getLastNDaysRange } from '@tymlez/common-libs';
import {
  HistoryQuery,
  Loading,
  useSiteContext,
  HistoryQueryText,
  RealtimeQueryText,
  CommonTable,
  CustomPagination,
  Image,
  StyledTableFooter,
} from '@tymlez/frontend-libs';
import { VcModal } from './VcModal';
import { useVerificationData } from '../../../hooks/useVerification';
import trustchainLogo from '../../../../public/logo/trustchain.png';

export const SiteVerification: FC = () => {
  const { currentSite } = useSiteContext();
  const days = getLastNDaysRange(currentSite?.timezone || '', 7);
  const urlParams = new URLSearchParams(window.location.search || '');
  const fromURL = urlParams.get('from');
  const toURL = urlParams.get('to');

  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [days.from, days.to],
  });
  useEffect(() => {
    if (fromURL && toURL) {
      setHistoryQuery({ dateRange: [fromURL, toURL] });
    }
  }, [fromURL, toURL]);
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const [selectedVp, setSelectedVp] = useState<IVpRecord | null>(null);

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
      headerName: 'VP ID',
      headerAlign: 'left',
      flex: 200,
      align: 'left',
      renderCell: (item: any) => {
        return (
          <Button
            onClick={() => {
              setSelectedVp(item);
            }}
          >
            {item.vpId}
          </Button>
        );
      },
    },
    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 PRODUCED (T)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
    },
    {
      field: 'mintedDate',
      headerName: 'DATE AND TIME MINTED',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(new Date(params.mintedDate)),
    },
    {
      field: 'onChainUrl',
      headerName: 'VIEW TYMLEZ TRUST CHAIN',
      headerAlign: 'center',
      flex: 50,
      align: 'center',

      renderCell: (cellValues: any) => {
        const id = cellValues.messageId;
        return (
          <Box
            sx={{
              width: '120px',
              margin: 'auto',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Link
              href={`/trustchain/token/?id=${id}`}
              target="_blank"
              rel="noopener"
            >
              <Image src={trustchainLogo} />
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {selectedVp && (
        <VcModal
          vpRecord={selectedVp}
          handleClose={() => setSelectedVp(null)}
          dataTestId="cohort-verified-guarantee-vc-modal"
        />
      )}
      <Card
        elevation={12}
        sx={{ height: '90%' }}
        data-test-id="cohort-verified-guarantee"
      >
        <CardHeader
          disableTypography
          title={
            <>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  data-test-id="cohort-verified-guarantee-title"
                  color="textPrimary"
                  variant="h6"
                >
                  VERIFICATION
                </Typography>
                <img
                  data-test-id="cohort-verified-guarantee-hedera-image"
                  src="/logo/hederaLogo.svg"
                  alt="Hedera Logo"
                />
              </Box>
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: 3,
          }}
        >
          <Stack spacing={2} sx={{ width: '100%' }}>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <CommonTable
                  dataTestId="cohort-verified-guarantee-common-table"
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
                <Box sx={{ mt: 4 }}>
                  <CustomPagination
                    dataTestId="cohort-verified-guarantee-pagination"
                    page={page}
                    count={data ? data.num : 0}
                    pageSize={pageSize}
                    pageSizeList={[5, 10, 25, 50, 100]}
                    handleChangePage={handleChangePage}
                    handleChangePageSize={handleChangeRowsPerPage}
                  />
                </Box>
              </>
            )}
          </Stack>
        </Box>
        <StyledTableFooter dataTestId="cohort-verified-guarantee-footer" />
      </Card>
    </>
  );
};
