import React, { useState } from 'react';
import type { FC } from 'react';
import { Button, Card, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import {
  HistoryQuery,
  HistoryQueryText,
  LineChart,
  Loading,
  WeatherWidget,
  Image,
  useBreakpoint,
} from '@tymlez/frontend-libs';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { formatNumber, getLast24HoursRange } from '@tymlez/common-libs';
import buildingsImage from '../../../../../public/static/cohort_buildings.png';
import { useCarbonKeyMetrics } from '../../../../hooks/useCarbonData';
import { useGenerationHistoryKeyMetrics } from '../../../../hooks/useGenerationHistory';
import { useConsumptionKeyMetrics } from '../../../../hooks/useConsumptionData';
import { useWeather } from '../../../../hooks/useWeather';
import { PieChart } from './PieChart';
import { TenancyUsage } from './TenancyUsage';
import { EnergyComponent } from './EnergyComponent';

import {
  StyledBoxLineChartEnergyBox,
  StyledImgBuildingGrid,
  StyledKeyMetricsAndDateGrid,
  StyledSolarEnergyGrid,
  StyledTitleKeyMetricsTypography,
  StyledTitleSolarEnergyText,
  StyledValueEnergyTypography,
  StyledWeatherGrid,
} from '../../styled-components';

const iconMap: Record<string, string> = {
  carbonOutput: '../icons/carbon.svg',
  carbonAbatement: '../icons/CO2Down.svg',
  solarEnergyGeneration: '../icons/solarSupplied.svg',
  gridEnergySupplied: '../icons/electricitySupplied.svg',
};

interface Props {
  historyQuery: HistoryQuery;
  dataTestId?: string;
}

export const Summary: FC<Props> = ({ historyQuery, dataTestId }) => {
  const dateRange = getLast24HoursRange();
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const { data: carbon, isLoading: carbonIsLoading } = useCarbonKeyMetrics(
    from,
    to,
  );
  const { data: consumptionData } = useConsumptionKeyMetrics(from, to);
  const { data: generation24hData, isLoading: generation24hLoading } =
    useGenerationHistoryKeyMetrics(dateRange.from, dateRange.to);
  const { data: generationData } = useGenerationHistoryKeyMetrics(from, to);
  const { data: weatherData, loading: weatherLoading } = useWeather();

  const [mainItem, setMainItem] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useBreakpoint('sm', 'down');
  let screen = 'desktop';
  if (isSmallScreen) {
    screen = 'mobile';
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        alignItems: 'stretch',
        p: 3,
        pb: 0,
        pt: {
          xs: '150px',
          sm: 0,
        },
      }}
      data-test-id={dataTestId}
    >
      <Grid item container spacing={2} xs={12} md={8}>
        <Grid item md={12} xs={12} container>
          <Grid item xs={12}>
            <Card
              elevation={12}
              sx={{
                height: '100%',
                px: 2,
                pb: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container>
                {/* weather component */}
                <StyledWeatherGrid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  sx={{
                    borderRight: {
                      xs: 'none',
                      sm: 'none',
                      md: '1px dotted rgba(145, 158, 171, 0.15)',
                    },
                  }}
                >
                  <WeatherWidget
                    dataTestId={`${dataTestId}-weather`}
                    data={weatherData}
                    loading={weatherLoading}
                    color="#293343"
                  />
                </StyledWeatherGrid>
                {/* end weather component */}

                {/* Solar Energy Generation (simulated) */}
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  sx={{ display: 'flex' }}
                  data-test-id={`${dataTestId}-solar-generation`}
                >
                  <StyledSolarEnergyGrid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      md={12}
                      lg={8}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Grid
                        container
                        spacing={2}
                        sx={{ m: 0, justifyContent: 'center' }}
                      >
                        <img
                          style={{ width: '72px', height: '72px' }}
                          data-test-id={`${dataTestId}-solar-generation-icon`}
                          alt="iconEnergy"
                          src="/static/icons/iconEnergy.svg"
                        />
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                          <StyledTitleSolarEnergyText
                            data-test-id={`${dataTestId}-solar-generation-title`}
                          >
                            Solar Energy Generation (simulated)
                          </StyledTitleSolarEnergyText>
                          {generation24hLoading ? (
                            <Loading
                              dataTestId={`${dataTestId}-solar-generation-loading`}
                            />
                          ) : (
                            <StyledValueEnergyTypography
                              color="textPrimary"
                              sx={{ mt: 1, textAlign: 'center' }}
                              variant="h5"
                              data-test-id={`${dataTestId}-solar-generation-value`}
                            >
                              {formatNumber(generation24hData?.value || 0)} kWh
                            </StyledValueEnergyTypography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={6}
                      lg={4}
                      sx={{ margin: 'auto', p: 0 }}
                    >
                      <StyledBoxLineChartEnergyBox>
                        {generation24hLoading ? (
                          <Loading dataTestId={`${dataTestId}-chart-loading`} />
                        ) : (
                          <LineChart
                            dataTestId={`${dataTestId}-chart`}
                            data={[
                              {
                                data: generation24hData?.series?.map(
                                  (x: any) => x.value,
                                ),
                              },
                            ]}
                            color="#6cc261"
                          />
                        )}
                      </StyledBoxLineChartEnergyBox>
                    </Grid>
                  </StyledSolarEnergyGrid>
                </Grid>
                {/* End Solar Energy Generation (simulated) */}

                <StyledImgBuildingGrid item xs={12}>
                  <Image
                    data-test-id={`${dataTestId}-building-image`}
                    src={buildingsImage}
                    alt="cohort buildings"
                  />
                </StyledImgBuildingGrid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} container spacing={3}>
          <Grid item xs={12} data-test-id={`${dataTestId}-energy-components`}>
            <Card elevation={12} sx={{ height: '100%', p: 3 }}>
              <StyledKeyMetricsAndDateGrid>
                <StyledTitleKeyMetricsTypography
                  data-test-id={`${dataTestId}-energy-components-title`}
                >
                  Key Metrics
                </StyledTitleKeyMetricsTypography>
                <HistoryQueryText
                  fromDate={fromDate}
                  toDate={toDate}
                  dataTestId={`${dataTestId}-energy-components-date-range`}
                />
              </StyledKeyMetricsAndDateGrid>

              {screen === 'mobile' && (
                <Grid sx={{ textAlign: 'end' }}>
                  <Button
                    size="small"
                    sx={{ minWidth: 'unset' }}
                    onClick={() => {
                      setMainItem(mainItem - 1);
                    }}
                    disabled={mainItem === 0}
                    data-test-id="cohort-summary-mobile-back-button"
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight data-test-id="cohort-summary-mobile-back-right-button" />
                    ) : (
                      <KeyboardArrowLeft data-test-id="cohort-summary-mobile-back-left-button" />
                    )}
                  </Button>
                  <Button
                    size="small"
                    sx={{ minWidth: 'unset' }}
                    onClick={() => {
                      setMainItem(mainItem + 1);
                    }}
                    disabled={mainItem === 3}
                    data-test-id="cohort-summary-mobile-next-button"
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft data-test-id="cohort-summary-mobile-next-left-button" />
                    ) : (
                      <KeyboardArrowRight data-test-id="cohort-summary-mobile-next-right-button" />
                    )}
                  </Button>
                </Grid>
              )}

              {carbon &&
                carbon.map((energy, index: any) => {
                  return (
                    <EnergyComponent
                      dataTestId={`${dataTestId}-energy-component`}
                      index={index}
                      key={energy.name}
                      src={iconMap[energy.name]}
                      data={energy}
                      screen={screen}
                      mainItem={mainItem}
                    />
                  );
                })}

              {consumptionData && (
                <EnergyComponent
                  dataTestId={`${dataTestId}-energy-component`}
                  index={3}
                  key={consumptionData.name}
                  src={iconMap[consumptionData.name]}
                  data={consumptionData}
                  screen={screen}
                  mainItem={mainItem}
                />
              )}

              {generationData && (
                <EnergyComponent
                  dataTestId={`${dataTestId}-energy-component`}
                  index={4}
                  key={generationData.name}
                  src={iconMap[generationData.name]}
                  data={generationData}
                  screen={screen}
                  mainItem={mainItem}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={2} xs={12} md={4}>
        <Grid item md={12} xs={12} container spacing={3}>
          <Grid item xs={12}>
            <PieChart
              dataTestId={`${dataTestId}-carbon-output`}
              data={carbon}
              historyQuery={historyQuery}
              isLoading={carbonIsLoading}
            />
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} container spacing={3}>
          <Grid item xs={12}>
            <TenancyUsage
              dataTestId={`${dataTestId}-tenancy-usage`}
              historyQuery={historyQuery}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
