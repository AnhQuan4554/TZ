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
import { CustomizedCard, CommonTable } from '@tymlez/frontend-libs';
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

  useEffect(() => {
    if (!isLoading) {
      handleLoading(false);
    }
  }, [isLoading, handleLoading]);

  const record = data?.vcRecords[0];
  const id = vpRecord.messageId;
  const columns: GridColDef[] = [
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
                dataTestId={`${dataTestId}-customized-card-h2-produced`}
                title="H2 Produced"
                uom={record?.emissionsUOM}
                value={vpRecord?.value}
                roundDigits={2}
              />

              <CustomizedCard
                dataTestId={`${dataTestId}-customized-card-grid-energy`}
                title="Grid Energy"
                uom="kWh"
                value={vpRecord?.gridEnergyValue || 0}
                roundDigits={2}
              />

              <CustomizedCard
                dataTestId={`${dataTestId}-customized-card-co2-produced`}
                title="CO2 Produced"
                uom={record?.emissionsUOM}
                value={vpRecord?.CO2eqEmissions}
                roundDigits={2}
              />
            </Box>

            <CommonTable
              dataTestId={`${dataTestId}-commom-table`}
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
