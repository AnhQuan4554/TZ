import { Box, Modal, Typography } from '@mui/material';
import { CommonTable } from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { formatDateTimeTooltipWithSecond } from '@tymlez/common-libs';
import type { FC } from 'react';
import { useViewPurchaseHistory } from '../../../hooks/useDovu';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const PurchaseHistory: FC<Props> = ({ isOpen, handleClose }) => {
  const purchaseHistory = useViewPurchaseHistory();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Order ID',
      headerAlign: 'left',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Order Date',
      headerAlign: 'center',
      type: 'dateTime',
      align: 'center',
      flex: 0.7,
      renderCell: (params: any) =>
        formatDateTimeTooltipWithSecond(new Date(params.createdAt)),
    },
    {
      field: 'retiredKgs',
      headerName: 'Offsets Purchased (Tonnes)',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      flex: 0.3,
      renderCell: (item: any) => {
        return item.retiredKgs / 1000; //convert to tonne
      },
    },
  ];

  return (
    <Modal
      data-test-id="dovu-carbon-purchase-history"
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: '50%',
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
        <Typography
          data-test-id="dovu-carbon-purchase-history-title"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Carbon Offsets Purchased
        </Typography>
        <CommonTable
          data-test-id="dovu-carbon-purchase-history-common-table"
          stickyHeader
          columns={columns}
          data={purchaseHistory?.data || []}
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
