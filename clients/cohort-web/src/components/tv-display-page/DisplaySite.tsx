import React from 'react';
import type { FC } from 'react';
import { CardContent, Grid } from '@mui/material';
import { WeatherWidget, Image } from '@tymlez/frontend-libs';
import { getLast24HoursRange } from '@tymlez/common-libs';
import buildingsImage from '../../../public/static/cohort_buildings.png';
import { useWeather } from '../../hooks/useWeather';
import { StyledBuildingCard, StyledCardWeatherGrid } from './styled-components';
import { useConsumptionSeries } from '../../hooks/useConsumptionData';
import { useCarbonSeriesData } from '../../hooks/useCarbonData';
import { useTenancyData } from '../../hooks/useTenancyData';
import { TenancyRealTimeChart } from './tenancy/TenancyRealtimeChart';
import { CarbonOutput } from './CarbonOutput';
import { TenancyUsagePieChart } from './tenancy/TenancyUsagePieChart';
import { CarbonEmissionsRealTimeChart } from './CarbonEmissionsRealTimeChart';

export const DisplaySite: FC = () => {
  const dateRange = getLast24HoursRange();

  const { data: carbon, isLoading: carbonIsLoading } = useCarbonSeriesData(
    dateRange.from,
    dateRange.to,
    'minute',
  );
  const { data: consumption } = useConsumptionSeries(
    dateRange.from,
    dateRange.to,
    'minute',
  );
  const { data: tenancyData, isLoading: tenancyIsLoading } = useTenancyData(
    dateRange.from,
    dateRange.to,
    'minute',
  );
  const { data: weatherData, loading: weatherLoading } = useWeather();

  return (
    <Grid container spacing={1} sx={{ alignItems: 'stretch' }}>
      <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
        <Grid container spacing={1} sx={{ pb: 1 }}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <StyledCardWeatherGrid
              elevation={12}
              sx={{
                justifyContent: 'center',
                border: '1px solid #ECECEC',
                '& > div': {
                  boxShadow: 'none',
                },
              }}
            >
              <WeatherWidget
                dataTestId="cohort-tv-display-weather"
                data={weatherData}
                loading={weatherLoading}
                color="#293343"
              />
            </StyledCardWeatherGrid>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <CarbonOutput
              carbon={carbon?.emission}
              title="Carbon Output"
              uom="kg"
              imgSource="/icons/carbon.svg"
              dataTestId="cohort-tv-display-carbon-output"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <CarbonOutput
              carbon={consumption}
              title="Grid Energy Supplied"
              uom="kWh"
              imgSource="/icons/electricitySupplied.svg"
              dataTestId="cohort-tv-display-energy-supplied"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ pb: 1 }}>
          <Grid item md={12} xs={12}>
            <CarbonEmissionsRealTimeChart
              dataTestId="cohort-tv-display-realtime-carbon-emissions"
              data={carbon || {}}
              isLoading={carbonIsLoading}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <TenancyRealTimeChart
              dataTestId="cohort-tv-display-realtime-tenancy"
              data={tenancyData || []}
              isLoading={tenancyIsLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
        <Grid sx={{ pb: 1 }}>
          <StyledBuildingCard elevation={12}>
            <CardContent>
              <Image
                src={buildingsImage}
                alt="cohort buildings"
                data-test-id="cohort-tv-display-buildings"
              />
            </CardContent>
          </StyledBuildingCard>
        </Grid>
        <Grid
          sx={{
            height: 'calc(100% - 141px)',
          }}
        >
          <TenancyUsagePieChart
            dataTestId="cohort-tv-display-tenancy-usage"
            data={tenancyData || []}
            isLoading={tenancyIsLoading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
