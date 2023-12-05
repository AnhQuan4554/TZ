import type { FC } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

interface Props {
  data?: { name: string; value: number }[];
  dataTestId?: string;
}

export const SiteHistoricalCircuitTable: FC<Props> = ({ data, dataTestId }) => {
  return (
    <Table data-test-id={dataTestId}>
      <TableHead>
        <TableRow>
          <TableCell data-test-id={`${dataTestId}-col-Tenancy`}>
            TENANCY
          </TableCell>
          <TableCell data-test-id={`${dataTestId}-col-Consumption`}>
            CONSUMPTION
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map((tenancy) => {
            return (
              <TableRow
                key={tenancy.name}
                data-test-id={`${dataTestId}-${tenancy.name}`}
              >
                <TableCell data-test-id={`${dataTestId}-${tenancy.name}-label`}>
                  {tenancy.name}
                </TableCell>
                <TableCell data-test-id={`${dataTestId}-${tenancy.name}-value`}>
                  {+tenancy.value.toFixed(2)} kWh
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
