/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import type { FC } from 'react';
import { Box, Modal, Typography, Stack, Link } from '@mui/material';
import type { IVpRecord } from '@tymlez/platform-api-interfaces';
import { CommonTable, CustomizedCard, Image } from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { formatDateTimeTooltip, formatNumber } from '@tymlez/common-libs';
import dragonGlass from '../../../../public/dragonglass.png';
import { useVcRecords } from '../../../hooks/useVerificationData';

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
  const mocked = false; // turn this mocked to true if you dont have local guardian running for testing purpose);

  const { data, isLoading } = mocked
    ? useVcRecords(vpRecord.vpId, true)
    : useVcRecords(vpRecord.hash);

  useEffect(() => {
    if (!isLoading) {
      handleLoading(false);
    }
  }, [isLoading, handleLoading]);

  const co2Produced = vpRecord.CO2eqEmissions;
  const pigIron = vpRecord.value;
  const co2Reduced = vpRecord.CO2eqEmissionsReduction;
  const co2NetOffset = co2Produced - co2Reduced;

  const columns: GridColDef[] = [
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
      type: 'number',
      flex: 150,
      align: 'center',
    },
    {
      field: 'value',
      headerName: 'Pig Iron Produced (t)',
      headerAlign: 'center',
      flex: 100,
      type: 'number',
      align: 'center',
      renderCell: (params: any) => formatNumber(params.value || 0, 5),
    },
    {
      field: 'CO2eqEmissions',
      headerName: 'CO2 Emissions (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) => formatNumber(params.CO2eqEmissions || 0, 5),
    },
    {
      field: 'CO2eqEmissionsReduction',
      headerName: 'CO2 Offset (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) =>
        formatNumber(params.CO2eqEmissionsReduction || 0, 5),
    },
    {
      field: 'CO2NetOffset',
      headerName: 'Net CO2 Emissions (t)',
      headerAlign: 'center',
      type: 'number',
      flex: 100,
      align: 'center',
      renderCell: (params: any) =>
        formatNumber(
          params.CO2eqEmissions - params.CO2eqEmissionsReduction || 0,
          5,
        ),
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
          boxShadow: 24,
          p: 4,
        }}
      >
        {vpRecord && (
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
                  Minted Date:{' '}
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
                    href={vpRecord.onChainUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={dragonGlass} />
                  </Link>
                </Box>
              </Stack>
            </Stack>

            <Box
              sx={{
                mt: 5,
                textAlign: 'center',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(100px, 1fr))',
                columnGap: 5,
              }}
            >
              <CustomizedCard
                dataTestId={`${dataTestId}-customized-card-pig-iron`}
                title="Pig Iron Produced"
                uom="t"
                value={pigIron}
              />
              <CustomizedCard
                dataTestId={`${dataTestId}-customized-card-co2-emissions`}
                title="CO2 Emissions"
                uom="t"
                value={co2Produced}
              />
              <CustomizedCard
                dataTestId={`${dataTestId}-customized-card-co2-offset`}
                title="CO2 Offset"
                uom="t"
                value={co2Reduced}
              />
              <CustomizedCard
                dataTestId={`${dataTestId}-customized-card-net-co2`}
                title="Net CO2"
                uom="t"
                value={co2NetOffset}
              />
            </Box>

            <CommonTable
              dataTestId={`${dataTestId}-common-table`}
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
