/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import type { FC } from 'react';
import { Box, Modal, Typography, Link, Stack } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomizedCard,
  Loading,
  Image,
} from '@tymlez/frontend-libs';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import { formatDateTimeTooltip, formatNumber } from '@tymlez/common-libs';
import { useVcRecords } from '../../../hooks/useVerification';
import dragonGlass from '../../../../public/dragonglass.png';
import verifiedImage from '../../../../public/verified_white.png';

interface Props {
  vpRecord: IVpRecord;
  handleClose: () => void;
  timezone?: string;
}

export const VcModal: FC<Props> = ({ vpRecord, handleClose, timezone }) => {
  const { data, isLoading } = useVcRecords(vpRecord.hash, false);

  const columns: GridColDef[] = [
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
      field: 'fuelConsumed',
      headerName: 'FUEL USED (L)',
      headerAlign: 'center',
      type: 'number',
      minWidth: 150,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.value || 0, 4),
    },
    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 Produced (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
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
        formatDateTimeTooltip(
          new Date(params.intervalStartDateTime),
          'dd MMM HH:mm',
          timezone,
        ),
    },
    {
      field: 'intervalEndDateTime',
      headerName: 'Interval End Date Time',
      headerAlign: 'center',
      type: 'dateTime',
      flex: 150,
      align: 'center',
      renderCell: (params: any) =>
        formatDateTimeTooltip(
          new Date(params.intervalEndDateTime),
          'dd MMM HH:mm',
          timezone,
        ),
    },

    {
      field: 'intervalDuration',
      headerName: 'Interval Duration (s)',
      headerAlign: 'center',
      type: 'number',
      flex: 150,
      align: 'center',
    },
  ];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Modal
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
        {vpRecord && (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Typography id="certificate-title" variant="h6" component="h2">
                CERTIFICATE ID: {vpRecord.vpId}
              </Typography>
              <Typography variant="body1" component="h2">
                Minted Date:{' '}
                {formatDateTimeTooltip(
                  new Date(vpRecord.mintedDate),
                  'dd MMM HH:mm',
                  timezone,
                )}
              </Typography>
              <Box sx={{ width: 100, mt: 1, ml: 3 }}>
                <Link
                  href={vpRecord.onChainUrl}
                  target="_blank"
                  title="Hedera on chain transaction details "
                >
                  <Image
                    src={dragonGlass}
                    alt="Hedera on chain transaction details"
                  />
                </Link>
              </Box>
            </Stack>

            <Box sx={{ width: 100, mt: 2 }}>
              <Image src={verifiedImage} alt="verified" />
            </Box>

            <Box
              sx={{
                mt: 5,
                textAlign: 'center',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
                columnGap: 5,
              }}
            >
              <CustomizedCard
                title="Water pumped"
                uom="kL"
                value={(vpRecord.waterPumped || 0) / 1000}
              />
              <CustomizedCard
                title="Fuel consumed"
                uom="L"
                value={vpRecord.value || 0}
              />
              <CustomizedCard
                title="CO2 Produced"
                uom="t"
                value={vpRecord.CO2eqEmissions}
              />
            </Box>

            <CommonTable
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
