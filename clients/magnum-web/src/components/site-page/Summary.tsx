import type { FC } from 'react';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HistoryQuery, HistoryQueryText } from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { EnergyProducedBlock } from './EnergyProducedBlock';
import {
  useBiocharSummary,
  useFineIronOreSummary,
  usePigIronSummary,
} from '../../hooks/useSummaryData';

interface Props {
  historyQuery: HistoryQuery;
  dataTestId?: string;
}

const GridText = styled('div')(() => ({}));

export const Summary: FC<Props> = ({ historyQuery, dataTestId }) => {
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const { data: biocharData } = useBiocharSummary(from, to);
  const { data: fineIronOre } = useFineIronOreSummary(from, to);
  const { data: pigIron } = usePigIronSummary(from, to);

  return (
    <Stack direction="column" spacing={5} data-test-id={dataTestId}>
      <Card elevation={12} sx={{ p: 4 }}>
        <GridText>
          <Grid item xs={6} style={{ maxWidth: '100%' }}>
            <Typography
              data-test-id={`${dataTestId}-title`}
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '36px',
                color: '#293343',
                mb: 2,
              }}
            >
              Summary
            </Typography>
            <HistoryQueryText
              fromDate={fromDate}
              toDate={toDate}
              dataTestId={`${dataTestId}-date-range-title`}
            />
          </Grid>
        </GridText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <EnergyProducedBlock
              dataTestId={`${dataTestId}-energy-produced-block-biochar`}
              title="Biochar Produced"
              data={biocharData}
              hasEmptyLine
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EnergyProducedBlock
              dataTestId={`${dataTestId}-energy-produced-block-fine-iron-ore`}
              title="Fine Iron Ore Produced"
              data={fineIronOre}
              hasEmptyLine
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EnergyProducedBlock
              title="Pig Iron Produced"
              data={pigIron}
              dataTestId={`${dataTestId}-energy-produced-block-pig-iron`}
            />
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
