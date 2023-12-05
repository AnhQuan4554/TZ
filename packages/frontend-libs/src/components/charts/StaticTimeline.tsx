/**
 * Widget to show static timeline chart with one or more series.
 * User can turn on/off specific series.
 * User can switch mode: Line or Area.
 */
import {
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from '@mui/material';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { ChartType, Series, StaticTimelineChart } from './StaticTimelineChart';
import { HistoryQuery, HistoryQueryForm } from '../date-range-pickers/HistoryQueryForm';
import { TymlezLogo } from '../logo/TymlezLogo';
import { Loading } from '../loading';
import { HistoryQueryText } from '../date-range-pickers';
import {
  StyledChartBox,
  StyledHistoryQueryTextGrid,
  StyledSubTitleTypography,
} from './styled-components';
import { AlignCenterJustifySpaceBetweenBox } from '../common/styled-components';

export interface IStaticTimelineProps {
  isLoading?: boolean;
  series: Array<Series>;
  chartType?: ChartType;
  selectChartType?: boolean;
  width?: string | number;
  height?: string | number;
  xTitle?: string;
  yTitle?: string;
  enableDataLabels?: boolean;
  title?: string;
  subTitle?: any;
  historyQuery?: HistoryQuery;
  setHistoryQuery?: Dispatch<SetStateAction<HistoryQuery>>;
  fromDate?: any;
  toDate?: any;
  footer?: React.ReactElement;
  showFullScreen?: boolean;
  showSeriesDescriptors?: boolean;
  customStyle?: any;
  uom?: string;
  disabledList?: string[];
  dataTestId?: string;
  netCO2?: string;
}

const StaticTimeline: FC<IStaticTimelineProps> = ({
  isLoading,
  series,
  chartType = 'line',
  selectChartType = false,
  width,
  height,
  xTitle,
  yTitle,
  enableDataLabels,
  title,
  subTitle,
  historyQuery,
  setHistoryQuery,
  fromDate,
  toDate,
  footer,
  showFullScreen = true,
  showSeriesDescriptors = true,
  customStyle,
  uom = 'kWh',
  disabledList,
  dataTestId,
  netCO2 = '',
}) => {
  const [selectedSeries, setSelectedSeries] = useState<Array<string>>([]);
  const seriesDescriptors = useMemo(
    () =>
      series.map((item) => ({
        name: item.name,
        color: item.color,
        disabled: disabledList?.includes(item.name),
      })),
    [disabledList, series]
  );
  const netInd = seriesDescriptors.findIndex((desc) => desc.name === netCO2);
  const handle = useFullScreenHandle();
  useEffect(() => {
    const selectedSeriesFromDescriptoprs = seriesDescriptors
      .filter((item) => !item.disabled)
      .map((item) => item.name);
    setSelectedSeries(
      selectedSeriesFromDescriptoprs.filter((item) =>
        selectedSeries.length === 0 ? true : selectedSeries.includes(item)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesDescriptors]);

  const handleChangeSeriesOnOff = useCallback(
    (event: ChangeEvent<{ checked: boolean }>, name: string) => {
      setSelectedSeries((prevSelectedSeries) =>
        !event.target.checked
          ? prevSelectedSeries.filter((item) => item !== name && item !== netCO2)
          : seriesDescriptors
              .map((item) => item.name)
              .filter((item: string) => item === name || prevSelectedSeries.includes(item))
      );
      //disable net carbon if co2 emission or co2 abated is unchecked
      if (netInd >= 0) {
        if (!event.target.checked) {
          seriesDescriptors[netInd].disabled = name !== netCO2;
        } else {
          seriesDescriptors[netInd].disabled = selectedSeries.length < 1;
        }
      }
    },
    [seriesDescriptors, netCO2, netInd, selectedSeries]
  );

  const chartSeries = useMemo(
    () => series.filter((item) => selectedSeries.includes(item.name)),
    [series, selectedSeries]
  );

  const [selectedChartType, setChartType] = useState<ChartType>(chartType);
  const handleChangeChartType = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setChartType(event.target.value as ChartType);
  }, []);
  return (
    <FullScreen handle={handle}>
      {handle.active && <TymlezLogo />}
      <Card elevation={12} sx={customStyle}>
        <CardHeader
          data-test-id={`${dataTestId}-header`}
          disableTypography
          title={
            <AlignCenterJustifySpaceBetweenBox>
              <Grid container justifyContent="space-between" spacing={3}>
                <Grid item>
                  <Typography
                    data-test-id={`${dataTestId}-title`}
                    color="textPrimary"
                    className="stl-title"
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                  >
                    {title}
                  </Typography>
                  <StyledSubTitleTypography
                    data-test-id={`${dataTestId}-subtitle`}
                    color="textPrimary"
                    variant="subtitle1"
                    className="stl-sub-title"
                  >
                    {subTitle}
                  </StyledSubTitleTypography>
                </Grid>
                {historyQuery && setHistoryQuery && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={6}
                    justifyContent={{
                      xs: 'flex-start',
                      md: showFullScreen ? 'center' : 'flex-end',
                    }}
                  >
                    <HistoryQueryForm query={historyQuery} onUpdateQuery={setHistoryQuery} />
                  </Grid>
                )}
                {fromDate && toDate && (
                  <StyledHistoryQueryTextGrid>
                    <HistoryQueryText
                      fromDate={fromDate}
                      toDate={toDate}
                      dataTestId={`${dataTestId}-date-range-title`}
                    />
                    {showFullScreen && (
                      <Grid item>
                        {handle.active ? (
                          <Tooltip title="Exit fullscreen">
                            <FullscreenExitIcon fontSize="small" onClick={handle.exit} />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Fullscreen">
                            <FullscreenIcon fontSize="small" onClick={handle.enter} />
                          </Tooltip>
                        )}
                      </Grid>
                    )}
                  </StyledHistoryQueryTextGrid>
                )}
              </Grid>
            </AlignCenterJustifySpaceBetweenBox>
          }
        />
        {isLoading ? (
          <Loading />
        ) : (
          <StyledChartBox>
            <Grid container justifyContent="space-between" spacing={1}>
              {showSeriesDescriptors && (
                <Grid
                  data-test-id={`${dataTestId}-descriptors`}
                  item
                  xs={12}
                  sm={selectChartType ? 9 : 12}
                >
                  <FormGroup row>
                    {seriesDescriptors.map((item) => (
                      <FormControlLabel
                        data-test-id={`${dataTestId}-descriptors-${item.name
                          .toLowerCase()
                          .replaceAll(' ', '-')}`}
                        key={item.name}
                        control={
                          <Checkbox
                            disabled={item.disabled}
                            checked={selectedSeries.some(
                              (visibleItem) => visibleItem === item.name
                            )}
                            onChange={(event) => handleChangeSeriesOnOff(event, item.name)}
                            sx={{
                              color: item.color,
                              '&.Mui-checked': {
                                color: item.color,
                              },
                            }}
                          />
                        }
                        label={item.name}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              )}

              {selectChartType && (
                <Grid item xs={12} sm={3} container justifyContent="flex-end">
                  <FormControl>
                    <RadioGroup
                      row
                      aria-label="chart type"
                      name="chartType"
                      value={selectedChartType}
                      onChange={handleChangeChartType}
                      defaultValue="line"
                    >
                      <FormControlLabel
                        value="line"
                        control={<Radio color="primary" />}
                        label="Line"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="area"
                        control={<Radio color="primary" />}
                        label="Area"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <StaticTimelineChart
                  data-test-id={dataTestId}
                  series={chartSeries}
                  type={selectedChartType}
                  height={handle.active ? window.innerHeight - 300 : height}
                  width={width}
                  xTitle={xTitle}
                  yTitle={yTitle}
                  enableDataLabels={enableDataLabels}
                  uom={uom}
                />
              </Grid>
            </Grid>
          </StyledChartBox>
        )}
        {footer}
      </Card>
    </FullScreen>
  );
};

export default StaticTimeline;
