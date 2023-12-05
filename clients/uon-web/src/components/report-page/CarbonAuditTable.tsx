import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from '@mui/material';
import type { UseQueryResult } from 'react-query';
import React, { FC } from 'react';
import { Loading, Image } from '@tymlez/frontend-libs';
import type { ICarbonAudit } from '@tymlez/frontend-libs/src/utils/TEMPORARY';
import hederaImage from '../../../public/Hedera.png';

interface Props {
  hookReturn: UseQueryResult<ICarbonAudit[] | undefined>;
}

export const CarbonAuditTable: FC<Props> = ({ hookReturn }) => {
  const { data, isLoading } = hookReturn;

  if (isLoading) {
    <Loading />;
  }

  return (
    <Card elevation={12}>
      <CardHeader
        sx={{ pb: 1 }}
        disableTypography
        title={
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography color="textPrimary" variant="h6">
              Audit Report for Carbon Emissions / Abatement
            </Typography>
            <Box sx={{ width: 120 }}>
              <Image src={hederaImage} />
            </Box>
          </Box>
        }
      />

      <CardContent>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#e7f4db', fontWeight: 'bold' }}>
              <TableCell>Fuel Source</TableCell>
              <TableCell>Measurement</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Carbon kg</TableCell>
              <TableCell>Audit link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((row: ICarbonAudit) => (
                <TableRow key={row.source}>
                  <TableCell>{row.source}</TableCell>
                  <TableCell>{Math.round(row.measurement)}</TableCell>
                  <TableCell>{row.units}</TableCell>
                  <TableCell>{row.carbon.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: '#92d050' }}>
                    {row.auditLink}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            background: '#e7f4db',
            fontWeight: 'bold',
            height: 42,
            width: '100%',
          }}
        />

        <Typography variant="subtitle2" sx={{ my: 2 }}>
          All data is verified by the TYMLEZ Blockchain Platform, built on and
          secured by the Hedera Hashgraph Network.
        </Typography>
      </CardContent>
    </Card>
  );
};
