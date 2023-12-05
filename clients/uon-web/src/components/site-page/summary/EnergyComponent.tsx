import type { FC } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { LineChart, Loading } from '@tymlez/frontend-libs';
import { formatNumber } from '@tymlez/common-libs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { energyStyles } from '../../../styles/energy/energyStyles';

interface Props {
  metricInfo: any;
  metricsData: any;
}

export const EnergyComponent: FC<Props> = ({ metricInfo, metricsData }) => {
  const data = metricsData.filter(
    (metric: any) => metric.metricKey === metricInfo.metricKey,
  )[0];
  const trendColor = data.percentageChange >= 0 ? '#27C281' : '#CF372C';
  const classes = energyStyles();

  return (
    <Grid
      container
      className={classes.gridContainer}
      key={metricsData.metricKey}
    >
      <Grid item xs={4} sm={2} md={1}>
        <img
          style={{
            width: '48px',
          }}
          src={data.icon}
          alt="icon"
        />
      </Grid>
      <Grid item xs={8} sm={3} md={4} className={classes.jcFlexStart}>
        <Typography className={classes.title}>{data.title}</Typography>
      </Grid>
      <Grid item xs={12} sm={3} md={3} className={classes.jcCenter}>
        {data && data.data && data.data.length > 0 ? (
          <LineChart
            data={[{ data: data && data.data.map((x: any) => x.y) }]}
            color={trendColor}
            width={120}
          />
        ) : (
          <Loading />
        )}
      </Grid>
      <Grid item xs={12} sm={4} md={4} className={classes.jcFlexEnd}>
        <Typography className={classes.hydrogenValue}>
          {data && data.value ? (
            `${formatNumber(data.value || 0)} ${data.unit}`
          ) : (
            <Loading />
          )}
        </Typography>
        {data.percentageChange !== undefined ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
              padding: '4px 16px',
              height: '32px',
              background:
                data.percentageChange >= 0
                  ? 'rgba(39, 194, 129, 0.1)'
                  : 'rgba(207, 55, 44, 0.1)',
              color: data.percentageChange >= 0 ? '#0A7A4B' : '#CF372C',
              borderRadius: '2px',
              marginLeft: '8px',
            }}
          >
            {data.percentageChange >= 0 ? (
              <ArrowUpwardIcon color="success" />
            ) : (
              <ArrowDownwardIcon color="error" />
            )}
            {data.percentageChange} %
          </Box>
        ) : (
          <Loading />
        )}
      </Grid>
    </Grid>
  );
};
