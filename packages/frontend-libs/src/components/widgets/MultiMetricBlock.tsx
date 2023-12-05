import { Grid, Typography, Box } from '@mui/material';
import type { FC } from 'react';
import { SingleMetricBlock } from './SingleMetricBlock';

export interface ISingleBlock {
  title: string;
  icon?: string;
  value: number;
  uom: string;
  background?: string;
  sx?: React.CSSProperties;
  dataTestId?: string;
}

export interface IMultiMetricBlocksProps {
  title: string;
  data: Array<ISingleBlock>;
  dataTestId?: string;
}

export const MultiMetricBlocks: FC<IMultiMetricBlocksProps> = ({ data, title, dataTestId }) => {
  return (
    <Grid sx={{ mb: 5 }} data-test-id={dataTestId}>
      <Typography data-test-id={`${dataTestId}-title`} variant="h6" color="#293343" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Box>
        <Grid
          container
          sx={{ width: '100% !important', margin: '0px !important' }}
          spacing={{ xs: 1, sm: 2, md: 3, lg: 2, xl: 2 }}
          columns={{ xs: 12, sm: 8, md: 12, lg: 4, xl: 4 }}
        >
          {data.map((block) => (
            <Grid item xs={12} sm={12} md={6} lg={1} xl={1} key={block.title}>
              <SingleMetricBlock
                dataTestId={dataTestId}
                title={block.title}
                icon={block.icon}
                value={block.value}
                uom={block.uom}
                background={block.background}
                sx={{ height: '120px' }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};
