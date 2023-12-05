import type { FC } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useCarbonTotalData } from '../../hooks/useCarbonData';
import { useGenerationHistoryTotal } from '../../hooks/useGenerationHistory';
import { useConsumptionTotal } from '../../hooks/useConsumptionData';

interface Props {
  from: IIsoDate;
  to: IIsoDate;
}

export const CarbonEmissionsSummaryTable: FC<Props> = ({ from, to }) => {
  const { data: totalCarbon } = useCarbonTotalData(from, to);
  const { data: totalGeneration } = useGenerationHistoryTotal(from, to);
  const { data: totalConsumption } = useConsumptionTotal(from, to);

  const energyConsumption = totalConsumption || 0;
  const carbonEmission = totalCarbon ? Number(totalCarbon.emission) : 0;
  const carbonAbatement = totalCarbon ? Number(totalCarbon.abatement) : 0;
  const generation = totalGeneration || 0;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Energy</TableCell>
          <TableCell>Carbon (CO2e)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Consumption</TableCell>
          <TableCell>{energyConsumption?.toFixed(2)} kWh</TableCell>
          <TableCell>{carbonEmission?.toFixed(2)} kg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Generation</TableCell>
          <TableCell>{generation?.toFixed(2)} kWh</TableCell>
          <TableCell>{carbonAbatement?.toFixed(2)} kg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Net</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>
            {(energyConsumption - generation).toFixed(2)} kWh
          </TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>
            {(carbonEmission - carbonAbatement).toFixed(2)} kg
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
