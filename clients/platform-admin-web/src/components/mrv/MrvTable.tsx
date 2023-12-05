import axios from 'axios';
import toast from 'react-hot-toast';
import { Box, Button, Card } from '@mui/material';
import type { IMrvQuery } from '@tymlez/platform-api-interfaces';
import { FC, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { GridColDef } from '@mui/x-data-grid';
import { CommonTable, CustomPagination } from '@tymlez/frontend-libs';
import { useFetchMrvData } from '../../api/useFetchMrvData';
import { ObjectViewer } from '../common/ObjectViewer';
import { Loading } from '../Loading';
import { CommonDialog } from '../common/dialog/CommonDialog';
import { AddMRVModal } from './AddMRVModal';
import { DeleteMRVModal } from './DeleteMRVModal';

interface Props {
  query: IMrvQuery;
  addRefreshTime: Date;
  handleRefresh: () => void;
}

export const CustomizedMrvTable: FC<Props> = ({
  query,
  addRefreshTime,
  handleRefresh,
}) => {
  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useFetchMrvData(query, addRefreshTime);

  const [openApprovedDialog, setOpenApprovedDialog] = useState<boolean>(false);
  const [mrvId, setMrvId] = useState<string>('');
  const [selectedMrvId, setSelectedMrvId] = useState<string>('');
  const [deleting, setDeleting] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'readingId',
      headerName: 'READING ID',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'deviceId',
      headerName: 'DEVICE ID',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'intervalStartDateTime',
      headerName: 'INTERVAL START DATE TIME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'intervalEndDateTime',
      headerName: 'INTERVAL END DATE TIME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'intervalDuration',
      headerName: 'INTERVAL DURATION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return `${item.intervalDuration} (${item.intervalDurationUOM})`;
      },
    },
    {
      field: 'valueUOM',
      headerName: 'VALUE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return `${Number(item.value).toFixed(4)} (${item.valueUOM})`;
      },
    },
    {
      field: 'co2eqEmissions',
      headerName: 'CO2 EQ EMISSIONS',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <>
            {item.CO2eqEmissions ? Number(item.CO2eqEmissions).toFixed(4) : ''}
            {item.emissionsUOM ? ` (${item.emissionsUOM})` : ''}
          </>
        );
      },
    },
    {
      field: 'co2eqReductions',
      headerName: 'CO2 EQ REDUCTIONS',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <>
            {item.CO2eqEmissionsReduction
              ? Number(item.CO2eqEmissionsReduction).toFixed(4)
              : ''}
            {item.emissionsReductionUOM
              ? ` (${item.emissionsReductionUOM})`
              : ''}
          </>
        );
      },
    },
    {
      field: 'policyTag',
      headerName: 'POLICY TAG',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'sent',
      headerName: 'SENT?',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.sent ? 'Yes' : item.sendError ? item.sendError : 'Not Yet';
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <>
            {item.dataSourceType === 'manually' &&
              !item.sent &&
              !item.isApproved && (
                <Button
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    setMrvId(item.id.toString());
                    setOpenApprovedDialog(true);
                  }}
                >
                  Approve
                </Button>
              )}
            {item.dataSourceType === 'manually' && !item.sent && (
              <>
                <Button
                  title="Edit"
                  onClick={() => {
                    setSelectedMrvId(item.id.toString());
                    setDeleting(false);
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  title="Delete"
                  onClick={() => {
                    setSelectedMrvId(item.id.toString());
                    setDeleting(true);
                  }}
                  startIcon={<DeleteForeverIcon />}
                >
                  Delete
                </Button>
              </>
            )}

            <ObjectViewer
              data={item}
              rootKey={item.id.toString()}
              mode="dialog"
              allowCopy={false}
            />
          </>
        );
      },
    },
  ];

  const handleConfirm = async () => {
    try {
      const result = await axios.put<any>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/mrv/approve/${mrvId}`,
      );

      if (result.status === 200 && result.data.success) {
        toast.success('Approved');
        setOpenApprovedDialog(false);
        setMrvId('');
        handleRefresh();
      } else {
        toast.error(result.data.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setSelectedMrvId('');
    handleRefresh();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {selectedMrvId && (
        <>
          <AddMRVModal
            open={!deleting}
            onClose={handleClose}
            id={selectedMrvId}
            handleRefresh={handleRefresh}
          />
          <DeleteMRVModal
            open={deleting}
            onClose={handleClose}
            id={selectedMrvId}
          />
        </>
      )}
      <Card sx={{ marginTop: '24px', p: 3 }}>
        <CommonTable
          dataTestId="admin-mrv-data-commom-table"
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedMrvId}
          customCellStyle={{
            border: 'none',
          }}
          customHeadStyle={{
            border: 'none',
            background: '#A8D973',
            color: '#3A5320',
          }}
          hideFooter
        />
        <Box sx={{ marginTop: '32px' }}>
          <CustomPagination
            dataTestId="mrv-custom-pagination"
            page={page}
            count={queryResult ? queryResult.count : 0}
            pageSize={pageSize}
            // pageSizeList={[5, 10, 15]}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangeRowsPerPage}
          />
        </Box>
      </Card>

      <CommonDialog
        open={openApprovedDialog}
        title="Approved"
        content="The MRV will be submitted to guardian after next token minted. Do you want to process?"
        onClose={() => setOpenApprovedDialog(false)}
        dialogButtons={
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
};
