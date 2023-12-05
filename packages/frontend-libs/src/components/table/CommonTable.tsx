import type { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TablePagination,
  TableContainer,
  TableCell,
} from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from './styles/CustomizedTableStyle';

export interface ITableProps {
  columns: GridColDef[];
  data: any;
  selectedCell?: any;
  count?: number;
  page?: any;
  pageSize?: number;
  colSpan?: number;
  hideFooter?: boolean;
  customHeadStyle?: any;
  customRowStyle?: any;
  customCellStyle?: any;
  stickyHeader?: boolean;
  rowsPerPageOptions?: number[];
  handleChangePage?: (_: any, newPage: number) => void;
  handleChangeRowsPerPage?: (event: any) => void;
  dataTestId?: string;
}

export const CommonTable: FC<ITableProps> = ({
  columns,
  data,
  selectedCell,
  count,
  page,
  pageSize,
  colSpan,
  hideFooter,
  customHeadStyle,
  customRowStyle,
  customCellStyle,
  stickyHeader,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions = [25, 50, 100],
  dataTestId,
}) => {
  return (
    <TableContainer
      sx={{ maxHeight: stickyHeader ? 540 : undefined, width: '100%', mt: 3 }}
      data-test-id={dataTestId}
    >
      <Table stickyHeader={stickyHeader} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <StyledTableCell
                  data-test-id={`column-${col.field.toLowerCase()}`}
                  key={`table-head-cell-${col.field}`}
                  style={customHeadStyle}
                  align={col.headerAlign}
                  width={col.minWidth}
                >
                  {col.renderHeader ? col.renderHeader(data) : col.headerName}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.map((item: any) => (
              <StyledTableRow
                key={`table-row-${item.id}`}
                selected={selectedCell ? selectedCell?.id === item.id : false}
                style={customRowStyle}
              >
                {columns.map((col) => {
                  return (
                    <StyledTableCell
                      key={`table-cell-${col.field}`}
                      component="th"
                      scope="row"
                      width={col.minWidth}
                      style={customCellStyle}
                      align={col.align}
                    >
                      {col.renderCell ? col.renderCell(item) : item[col.field]}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))
          ) : (
            <TableCell align="center" colSpan={8} sx={{ borderBottom: 'none' }}>
              No Data
            </TableCell>
          )}
        </TableBody>
        {!hideFooter && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                colSpan={colSpan || 0}
                count={count || 0}
                rowsPerPage={pageSize || 0}
                page={page || 0}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage || (() => undefined)}
                onRowsPerPageChange={handleChangeRowsPerPage || (() => undefined)}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};
