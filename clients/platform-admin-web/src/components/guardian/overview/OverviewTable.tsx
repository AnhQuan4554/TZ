import type { GridColDef } from '@mui/x-data-grid';
import type { IGuardianEntity } from '@tymlez/platform-api-interfaces';
import { CommonTable } from '@tymlez/frontend-libs';
import type { FC } from 'react';
import { Card, Typography } from '@mui/material';

interface Props {
  data: IGuardianEntity[];
}

export const CustomizedOverviewTable: FC<Props> = ({ data }) => {
  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'USERNAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'accountId',
      headerName: 'ACCOUNT ID',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'role',
      headerName: 'ROLE',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'did',
      headerName: 'DID',
      headerAlign: 'center',
      minWidth: 300,
      align: 'center',
    },
    {
      field: 'balance',
      headerName: 'BALANCE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
  ];

  return (
    <Card sx={{ padding: '24px' }}>
      <Typography sx={{ flex: '1 1 100%' }} variant="h4" id="tableTitle">
        Guardian entities
      </Typography>
      <CommonTable
        data={data}
        columns={columns}
        hideFooter
        customCellStyle={{
          border: 'none',
        }}
        customHeadStyle={{
          border: 'none',
          background: '#A8D973',
          color: '#3A5320',
        }}
      />
      {/* <Box sx={{ marginTop: '32px' }}>
        <CustomPagination
          dataTestId="admin-magament-custom-pagination"
          // page={page}
          count={1}
          // pageSize={pageSize}
          // pageSizeList={[5, 10, 15]}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangeRowsPerPage}
        />
      </Box> */}
    </Card>
  );
};
