import React from 'react';
import type { FC } from 'react';
import { Box, Modal, Typography, Stack, Link } from '@mui/material';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import { CommonTable } from '@tymlez/frontend-libs';
import { formatDateTimeTooltip, formatNumber } from '@tymlez/common-libs';
import type { GridColDef } from '@mui/x-data-grid';
import TrustChainLogo from '../../common/logo/TrustChainLogo';

interface Props {
  vpRecord: IVpRecord;
  handleClose: () => void;
  dataTestId?: string;
}

export const VcModal: FC<Props> = ({ vpRecord, handleClose, dataTestId }) => {
  const id = vpRecord.messageId;
  const columns: GridColDef[] = [
    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 EQ Emissions (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 200,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.CO2eqEmissions || 0, 4),
    },

    {
      field: 'intervalStartDateTime',
      headerName: 'Interval Start Date Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(new Date(params.intervalStartDateTime)),
    },
    {
      field: 'intervalEndDateTime',
      headerName: 'Interval End Date Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(new Date(params.intervalEndDateTime)),
    },
    {
      field: 'intervalDuration',
      headerName: 'Interval Duration (s)',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
    },
    {
      field: 'value',
      headerName: 'Value (kWh)',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.value || 0, 4),
    },
  ];

  return (
    <Modal
      data-test-id={dataTestId}
      open={!!vpRecord}
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
        <Stack direction="row" justifyContent="space-between">
          <Typography
            data-test-id={`${dataTestId}-vpId`}
            id="modal-modal-title"
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
              sx={{
                width: '200px',
                mt: 1,
              }}
              data-test-id={`${dataTestId}-trustchain-link`}
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
          data={vpRecord.vcRecords || []}
          hideFooter
          customHeadStyle={{
            border: 'none',
            background: '#A8D973',
          }}
          customCellStyle={{
            border: 'none',
          }}
        />
      </Box>
    </Modal>
  );
};
