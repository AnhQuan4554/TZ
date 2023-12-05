import type { FC } from 'react';
import * as React from 'react';
import { Stack, Checkbox, Card, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { IMeterJob } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
  PermissionConfirmButton,
} from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AddMeterJobsModal } from './AddMeterJobsModal';
import { DeleteMeterJobModal } from './DeleteMeterJobModal';
import {
  useMeterJobsData,
  useDuplicateMeterJob,
} from '../../api/useFetchMeterJobsData';
import { Loading } from '../Loading';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  addRefreshTime: Date;
  setMeterJobs: Function;
}

export const CustomizedMeterJobsTable: FC<Props> = ({
  addRefreshTime,
  setMeterJobs,
}) => {
  const [updateRefreshTime, setUpdateRefreshTime] = React.useState(new Date());
  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    refetch,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useMeterJobsData(addRefreshTime, updateRefreshTime);

  const [selectedMeterId, setSelectedMeterId] = React.useState('');
  const [selectedMeterName, setSelectedMeterName] = React.useState('');
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [checkedList, setCheckedList] = React.useState<Array<any>>([]);
  const [checkAll, setCheckAll] = React.useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      headerName: 'CHECKBOX',
      headerAlign: 'center',
      minWidth: 20,
      align: 'center',
      renderHeader: (_item: any) => {
        return (
          <Checkbox
            value={queryResult.data?.map((i) => i.id)}
            checked={checkAll}
            onChange={handleChangeAll}
            color="success"
          />
        );
      },
      renderCell: (item: any) => {
        return (
          <Checkbox
            value={item.id}
            checked={checkedList.includes(item.id)}
            onChange={handleChange}
          />
        );
      },
    },
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
    },
    {
      field: 'dateRange',
      headerName: 'DATE RANGE',
      headerAlign: 'center',
      minWidth: 300,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <>
            {item.startISODateTime}
            <br />
            {item.endISODateTime}
          </>
        );
      },
    },
    {
      field: 'type',
      headerName: 'TYPE',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
      renderCell: (item: any) => {
        return item.isPaused ? 'Paused' : 'Active';
      },
    },
    {
      field: 'tags',
      headerName: 'TAGS',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
      renderCell: (item: any) => {
        return item.tags.join(', ');
      },
    },
    {
      field: 'currentTask',
      headerName: 'CURRENT TASK',
      headerAlign: 'center',
      minWidth: 300,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <>
            {item.currentTask?.id}
            <br />
            {item.currentTask?.isoDateTime}
          </>
        );
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
            <Stack direction="row">
              <ObjectViewer
                data={item}
                rootKey={item.id}
                mode="dialog"
                allowCopy={false}
              />
              <PermissionButton
                allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
                title="Edit"
                onClick={() => {
                  setSelectedMeterId(item.id);
                  setSelectedMeterName(item.name);
                  setDeleting(false);
                }}
                startIcon={<EditIcon />}
              >
                Edit
              </PermissionButton>
            </Stack>
            <Stack direction="row">
              <PermissionButton
                allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
                title="Delete"
                onClick={() => {
                  setSelectedMeterId(item.id);
                  setSelectedMeterName(item.name);
                  setDeleting(true);
                }}
                startIcon={<DeleteForeverIcon />}
              >
                Delete
              </PermissionButton>
              <PermissionConfirmButton
                allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
                btnTxt="Duplicate"
                btnIcon={<ContentCopyIcon />}
                questionTxt="Are you sure you want to create a copy of the job?"
                onConfirmMsg="Meter job has been duplicated"
                onConfirm={() => handleConfirmDuplicate(item)}
              />
            </Stack>
          </>
        );
      },
    },
  ];

  const handleClose = () => {
    setDeleting(false);
    setSelectedMeterId('');
    setUpdateRefreshTime(new Date());
  };

  const handleChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedList([...checkedList, value]);
      setMeterJobs([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== value));
      setMeterJobs(checkedList.filter((item) => item !== value));
    }
  };

  const handleChangeAll = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedList(value.split(','));
      setMeterJobs(value.split(','));
    } else {
      setCheckedList([]);
      setMeterJobs([]);
    }
    setCheckAll(!checkAll);
  };

  const duplicateMeterJob = useDuplicateMeterJob();
  const handleConfirmDuplicate = async (item: IMeterJob) => {
    await duplicateMeterJob.mutateAsync(item.id);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {selectedMeterId !== '' && (
        <>
          <AddMeterJobsModal
            open={!deleting}
            onClose={handleClose}
            meterJobId={selectedMeterId}
            meterName={selectedMeterName}
          />
          <DeleteMeterJobModal
            open={deleting}
            onClose={handleClose}
            meterJobId={selectedMeterId}
            meterName={selectedMeterName}
          />
        </>
      )}
      <Card sx={{ padding: '24px', marginTop: '24px' }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedMeterId}
          colSpan={10}
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
            dataTestId="metter-jobs-custom-pagination"
            page={page}
            count={queryResult ? queryResult.count : 0}
            pageSize={pageSize}
            // pageSizeList={[5, 10, 15]}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </>
  );
};
