import type { FC } from 'react';
import * as React from 'react';
import { Stack, Checkbox, Card, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublishIcon from '@mui/icons-material/Publish';
import type { IDataFlow, UUID } from '@tymlez/platform-api-interfaces';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
  PermissionConfirmButton,
} from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  dataFlows: IDataFlow[];
  selectedDataFlowIds: IDataFlow[];
  highlightedDataFlow: IDataFlow | null;
  page: number;
  pageSize: number;
  onChangePage: Function;
  onChangeRowsPerPage: Function;
  onEditDataFlow: Function;
  onDeleteDataFlow: Function;
  onDuplicateDataFlow: Function;
  onPublishDataFlow: Function;
  onSelectDataFlow: Function;
}

export const DataFlowsTable: FC<Props> = ({
  dataFlows,
  highlightedDataFlow,
  selectedDataFlowIds,
  page,
  pageSize,
  onChangePage,
  onChangeRowsPerPage,
  onEditDataFlow,
  onDeleteDataFlow,
  onDuplicateDataFlow,
  onPublishDataFlow,
  onSelectDataFlow,
}) => {
  const handleDataFlowSelectionChange = (e: any) => {
    const { value, checked } = e.target;
    let finalValues = [];
    if (checked) {
      finalValues = Array.from(new Set([...selectedDataFlowIds, value]));
    } else {
      finalValues = selectedDataFlowIds.filter((item) => value !== item);
    }

    onSelectDataFlow(finalValues.filter((i) => !!i));
  };

  const handleAllDataFlowSelectionChange = (e: any) => {
    const { checked } = e.target;
    let finalValues: UUID[] = [];
    if (checked) {
      finalValues = dataFlows.map((item) => item.id);
    }

    onSelectDataFlow(finalValues);
  };

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
            checked={dataFlows.length === selectedDataFlowIds.length}
            onChange={handleAllDataFlowSelectionChange}
            color="success"
          />
        );
      },
      renderCell: (item: any) => {
        return (
          <Checkbox
            value={item.id}
            checked={selectedDataFlowIds.includes(item.id)}
            onChange={handleDataFlowSelectionChange}
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
      field: 'runISODateTime',
      headerName: 'RECENT RUN',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'runStatus',
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
                  onEditDataFlow(item);
                }}
                startIcon={<EditIcon />}
              >
                Edit
              </PermissionButton>
            </Stack>
            <Stack direction="row">
              <PermissionConfirmButton
                allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
                btnTxt="Delete"
                btnIcon={<ContentCopyIcon />}
                questionTxt={`Are you sure you want to delete the data flow (${item.name})?`}
                onConfirmMsg="Deleting data flow..."
                onConfirm={() => onDeleteDataFlow(item)}
              />
              <PermissionConfirmButton
                allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
                btnTxt="Duplicate"
                btnIcon={<ContentCopyIcon />}
                questionTxt="Are you sure you want to create a copy of the data flow?"
                onConfirmMsg="Duplicating data flow"
                onConfirm={() => onDuplicateDataFlow(item)}
              />
              <PermissionConfirmButton
                allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
                btnTxt="Deploy"
                btnIcon={<PublishIcon />}
                questionTxt="Are you sure you want to publish the data flow?"
                onConfirmMsg="Publishing data flow"
                onConfirm={() => onPublishDataFlow(item)}
              />
            </Stack>
          </>
        );
      },
    },
  ];

  return (
    <Card sx={{ marginTop: '24px', p: 3 }}>
      <CommonTable
        columns={columns}
        data={dataFlows}
        selectedCell={highlightedDataFlow}
        count={dataFlows.length}
        page={page}
        pageSize={pageSize}
        colSpan={10}
        handleChangePage={(_, newPage) => onChangePage(newPage)}
        handleChangeRowsPerPage={(event) =>
          onChangeRowsPerPage(parseInt(event.target.value, 10))
        }
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
          dataTestId="data-flow-beta-custom-pagination"
          page={page}
          count={dataFlows ? dataFlows.length : 0}
          pageSize={pageSize}
          // pageSizeList={[5, 10, 15]}
          handleChangePage={(_: any, newPage: any) => onChangePage(newPage)}
          handleChangePageSize={(event) =>
            onChangeRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Box>
    </Card>
  );
};
