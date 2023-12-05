import type { FC } from 'react';
import * as React from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { CommonTable, CustomPagination } from '@tymlez/frontend-libs';
import type { IMeterDataAdminQuery } from '@tymlez/platform-api-interfaces';
import { Box } from '@mui/material';
import { Loading } from '../Loading';
import { useMeterDataData } from '../../api/useFetchMeterDataData';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  query: IMeterDataAdminQuery;
}

export const CustomizedMeterDataTable: FC<Props> = ({ query }) => {
  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useMeterDataData(query);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'left',
      flex: 10,
      align: 'left',
    },
    {
      field: 'isoDateTime',
      headerName: 'ISO Date Time',
      headerAlign: 'center',
      flex: 200,
      align: 'center',
    },
    {
      field: 'metricName',
      headerName: 'Metric name',
      headerAlign: 'left',
      flex: 200,
      align: 'left',
    },
    {
      field: 'metricValue',
      headerName: 'Metric Value',
      headerAlign: 'center',
      flex: 150,
      align: 'center',
      renderCell: (item: any) => {
        return Number(item.metricValue).toFixed(4);
      },
    },
    {
      field: 'meterKey',
      headerName: 'Meter',
      headerAlign: 'center',
      flex: 200,
      align: 'center',
      type: 'number',
    },

    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      flex: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <ObjectViewer
            data={item}
            rootKey={item.id.toString()}
            mode="dialog"
            allowCopy={false}
          />
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <CommonTable
        dataTestId="admin-manager-meter-data-commom-table"
        columns={columns}
        data={queryResult?.data}
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
          dataTestId="meter-data-custom-pagination"
          page={page}
          count={queryResult ? queryResult.count : 0}
          pageSize={pageSize}
          // pageSizeList={[5, 10, 15]}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};
