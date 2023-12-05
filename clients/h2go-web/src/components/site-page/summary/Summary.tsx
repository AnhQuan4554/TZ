import { FC, useState } from 'react';
import { Button, Card, Grid, Stack } from '@mui/material';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Loading,
  HistoryQuery,
  HistoryQueryForm,
  HistoryQueryText,
  useBreakpoint,
} from '@tymlez/frontend-libs';
import { EnergyComponent } from './EnergyComponent';
import { ISummaryItem, useSummaryData } from '../../../hooks/useSummaryData';
import { StyledMaintTitleComponentTypography } from './styled-components';
import { HydrogenFootprint } from './HydrogenFootprint';
import { PieChart } from './PieChart';

const iconMap: Record<string, string> = {
  waterSupplied: 'icons/water.svg',
  electricitySupplied: 'icons/electricitySupplied.svg',
  solarSupplied: 'icons/solarSupplied.svg',
  deliveredHydrogen: 'icons/hydrogen.svg',
  deliveredOxygen: 'icons/oxygen.svg',
  totalCarbonEmission: 'icons/carbon.svg',
};

interface Props {
  persistKey?: string;
  historyQuery: HistoryQuery;
  setHistoryQuery: (query: HistoryQuery) => void;
  dataTestId?: string;
}

export const Summary: FC<Props> = ({
  persistKey,
  historyQuery,
  setHistoryQuery,
  dataTestId,
}) => {
  const theme = useTheme();
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';
  const [mainItem, setMainItem] = useState(0);

  const { data } = useSummaryData(from, to);
  const isSmallScreen = useBreakpoint('sm', 'down');
  let screen = 'desktop';
  if (isSmallScreen) {
    screen = 'mobile';
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  return (
    <Grid container spacing={3} data-test-id={dataTestId}>
      <Grid item xs={12} md={8}>
        <Stack direction="column" spacing={5} sx={{ height: '100%' }}>
          <Card elevation={12} sx={{ p: 4, height: '100%' }}>
            <Grid container>
              <Grid item sm={12} md={6} sx={{ width: '100%', mb: 2 }}>
                <StyledMaintTitleComponentTypography
                  data-test-id={`${dataTestId}-title`}
                >
                  Summary
                </StyledMaintTitleComponentTypography>
                <HistoryQueryText
                  fromDate={fromDate}
                  toDate={toDate}
                  dataTestId={`${dataTestId}-date-range-title`}
                />
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
                sx={{
                  width: '100%',
                  position: 'relative',
                  display: 'flex',
                  justifyContent:
                    screen === 'desktop' ? 'flex-end' : 'flex-start',
                }}
              >
                <HistoryQueryForm
                  dataTestId={`${dataTestId}-history-query`}
                  persistKey={persistKey}
                  query={historyQuery}
                  onUpdateQuery={setHistoryQuery}
                  alignItems={screen === 'desktop' ? 'end' : 'start'}
                />
              </Grid>
            </Grid>
            {screen === 'mobile' && (
              <Grid sx={{ textAlign: 'end' }}>
                <Button
                  size="small"
                  sx={{ minWidth: 'unset' }}
                  onClick={() => {
                    setMainItem(mainItem - 1);
                  }}
                  disabled={mainItem === 0}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight
                      data-test-id={`${dataTestId}-mobile-back-right-button`}
                    />
                  ) : (
                    <KeyboardArrowLeft
                      data-test-id={`${dataTestId}-mobile-back-left-button`}
                    />
                  )}
                </Button>
                <Button
                  size="small"
                  sx={{ minWidth: 'unset' }}
                  onClick={() => {
                    setMainItem(mainItem + 1);
                  }}
                  disabled={mainItem === (data ? data.length - 1 : 0)}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft
                      data-test-id={`${dataTestId}-mobile-back-left-button`}
                    />
                  ) : (
                    <KeyboardArrowRight
                      data-test-id={`${dataTestId}-mobile-back-right-button`}
                    />
                  )}
                </Button>
              </Grid>
            )}
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                data-test-id={`${dataTestId}-energy-components`}
              >
                {data ? (
                  data.map((energy: ISummaryItem, index: number) => {
                    return (
                      <EnergyComponent
                        dataTestId={`${dataTestId}-energy-component-${energy.name}`}
                        index={index}
                        key={energy.name}
                        src={iconMap[energy.name]}
                        data={energy}
                        from={from}
                        to={to}
                        screen={screen}
                        mainItem={mainItem}
                      />
                    );
                  })
                ) : (
                  <Grid
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Loading dataTestId={`${dataTestId}-loading`} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid item container sx={{ display: 'inline-grid' }} spacing={3}>
          <>
            <Grid item xs={12}>
              {data ? (
                <PieChart data={data} dataTestId={`${dataTestId}-pie-chart`} />
              ) : (
                <Grid
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Loading dataTestId={`${dataTestId}-pie-chart-loading`} />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <HydrogenFootprint
                data={data || []}
                dataTestId={`${dataTestId}-hydrogen`}
              />
            </Grid>
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
