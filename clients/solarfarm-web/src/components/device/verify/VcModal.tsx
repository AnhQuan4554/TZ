/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import type { FC } from 'react';
import { Box, Modal, Typography, Stack, Link } from '@mui/material';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import {
  formatDateTimeTooltip,
  formatDateTimeTooltipWithSecond,
  formatNumber,
} from '@tymlez/common-libs';
import { CommonTable } from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { useVcRecords } from '../../../hooks/useVerificationData';
import TrustChainLogo from '../../common/logo/TrustChainLogo';

interface Props {
  vpRecord: IVpRecord;
  handleClose: () => void;
  handleLoading: (status: boolean) => void;
  dataTestId?: string;
}

export const VcModal: FC<Props> = ({
  vpRecord,
  handleClose,
  handleLoading,
  dataTestId,
}) => {
  const { data, isLoading } = useVcRecords(vpRecord.hash);
  const id = vpRecord.messageId;

  useEffect(() => {
    if (!isLoading) {
      handleLoading(false);
    }
  }, [isLoading, handleLoading]);

  const columns: GridColDef[] = [
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
      field: 'intervalStartDateTime',
      headerName: 'Interval Start Date Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltipWithSecond(new Date(params.intervalStartDateTime)),
    },
    {
      field: 'intervalEndDateTime',
      headerName: 'Interval End Date Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltipWithSecond(new Date(params.intervalEndDateTime)),
    },
  ];

  return (
    <Modal
      data-test-id={dataTestId}
      open={!!vpRecord && !isLoading}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: '80%',
          position: 'absolute',
          top: '45%',
          left: '45%',
          transform: 'translate(-45%, -45%)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        {data && (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                data-test-id={`${dataTestId}-vpId`}
                variant="h6"
                component="h2"
              >
                VP ID: {vpRecord.vpId}
              </Typography>
              <Stack direction="column">
                <Typography
                  data-test-id={`${dataTestId}-minted-date`}
                  variant="body1"
                  component="h2"
                >
                  Minted Date:
                  {formatDateTimeTooltip(new Date(vpRecord.mintedDate))}
                </Typography>
                <Box
                  data-test-id={`${dataTestId}-trustchain-link`}
                  sx={{
                    width: '200px',
                    marginTop: '4px',
                  }}
                >
                  <Link
                    href={`/trustchain/token/?id=${id}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <TrustChainLogo />
                  </Link>
                </Box>
              </Stack>
            </Stack>

            <CommonTable
              dataTestId={`${dataTestId}-common-table`}
              stickyHeader
              columns={columns}
              data={data?.vcRecords || []}
              hideFooter
              customHeadStyle={{
                border: 'none',
                background: '#A8D973',
              }}
              customCellStyle={{
                border: 'none',
              }}
            />
          </>
        )}
      </Box>
    </Modal>
  );
};
