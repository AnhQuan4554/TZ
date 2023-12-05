import { Card, CardHeader, Box, Grid, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import React, { FC, useState } from 'react';
import { ChartSerie, filterSeries, Loading } from '@tymlez/frontend-libs';
import type { ICarbonReport } from '@tymlez/frontend-libs/src/utils/TEMPORARY';
import { ReportTimelineChart } from '../ReportTimelineChart';
import type { IHookReturnWithPeriod } from '../../api/QueryPeriod';

interface Props {
  hookReturn: IHookReturnWithPeriod<ICarbonReport>;
}

export const CarbonReportChartContainer: FC<Props> = ({ hookReturn }) => {
  const { data, isLoading } = hookReturn;
  const initialSeries: ChartSerie[] = [
    {
      name: 'Carbon Produced',
      color: '#c8d4e0',
      data: [],
      type: 'area',
      key: 'emission',
    },
    {
      name: 'Carbon Abated',
      color: '#8bcc43',
      data: [],
      type: 'area',
      key: 'abatement',
    },
  ];

  const defaultSelectedSeries = initialSeries.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);

  const chartSeriesData = filterSeries(
    selectedSeries,
    data?.data,
    initialSeries,
  );

  if (isLoading) {
    <Loading />;
  }

  return (
    <Card elevation={12}>
      <CardHeader
        disableTypography
        title={
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item xs={12}>
                <Typography color="textPrimary" variant="h6" sx={{ mb: 4 }}>
                  Carbon Reporting for UON site #1
                </Typography>
              </Grid>
              {data && (
                <>
                  <Grid
                    item
                    container
                    xs={12}
                    sm={8}
                    md={9}
                    spacing={6}
                    sx={{ mb: 2 }}
                  >
                    <Grid item xs={4}>
                      <Typography color="textSecondary" variant="subtitle1">
                        {data.produced.title}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ my: 1 }}
                      >
                        {data.produced.data} Kg
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                        {data.produced.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary" variant="subtitle1">
                        {data.abated.title}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ my: 1 }}
                      >
                        {data.abated.data} Kg
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                        {data.abated.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary" variant="subtitle1">
                        {data.penetration.title}
                      </Typography>
                      <Typography variant="h5" sx={{ my: 1, color: '#96d257' }}>
                        {data.penetration.data} %
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                        {data.penetration.description}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sm={4}
                    md={3}
                    justifyContent="flex-start"
                  >
                    <span>
                      <CircleIcon
                        sx={{
                          color: initialSeries[0].color,
                          mr: 1,
                          fontSize: 14,
                        }}
                      />
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        component="span"
                      >
                        {data.produced.subTitle}
                      </Typography>
                    </span>
                    <span>
                      <CircleIcon
                        sx={{
                          color: initialSeries[1].color,
                          mr: 1,
                          ml: 6,
                          fontSize: 14,
                        }}
                      />
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        component="span"
                      >
                        {data.abated.subTitle}
                      </Typography>
                    </span>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        }
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          px: 2,
        }}
      >
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item xs={12}>
            <ReportTimelineChart
              series={chartSeriesData}
              type="area"
              height={400}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
