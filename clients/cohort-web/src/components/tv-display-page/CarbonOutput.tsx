import type { FC } from 'react';
import { Grid, Box } from '@mui/material';
import type { ISeriesItem } from '@tymlez/platform-api-interfaces';
import { LineChart, TrendPercent } from '@tymlez/frontend-libs';
import {
  StyledBoxDottedBox,
  StyledBoxValueAndLineChartBox,
  StyledBoxValueAndPercentageBox,
  StyledCarbonOutputGrid,
  StyledDataTime5MinutesGrid,
  StyledDateRangeIcon,
  StyledDateTimeGrid,
  StyledTitleCarbonOutputTypography,
  StyledTitleMinutesTypography,
  StyledTitleValueTypography,
} from './styled-components';

interface Props {
  carbon: ISeriesItem[] | undefined;
  dataTestId: string;
  title: string;
  uom: string;
  imgSource: string;
}

export const CarbonOutput: FC<Props> = ({
  carbon,
  title,
  uom,
  imgSource,
  dataTestId,
}) => {
  const carbon24h = carbon
    ? carbon.reduce((accumulator, object) => {
        return accumulator + +object.value;
      }, 0)
    : 0;
  const carbonLast10min =
    carbon && carbon.length > 0 ? carbon[carbon.length - 2].value : 0;
  const carbonLast5min =
    carbon && carbon.length > 0 ? carbon[carbon.length - 1].value : 0;

  const carbonTrendColor =
    carbonLast5min >= carbonLast10min ? '#27C281' : '#CF372C';

  return (
    <StyledCarbonOutputGrid>
      <StyledDateTimeGrid>
        <img
          data-test-id={`${dataTestId}-image`}
          src={imgSource}
          alt="icon-task"
        />
        <StyledTitleCarbonOutputTypography data-test-id={`${dataTestId}-title`}>
          {title}
        </StyledTitleCarbonOutputTypography>
      </StyledDateTimeGrid>
      <Grid container spacing={1} style={{ marginTop: '8px' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledDataTime5MinutesGrid>
            <StyledDateRangeIcon
              data-test-id={`${dataTestId}-5-min-date-range`}
            />
            <StyledTitleMinutesTypography
              data-test-id={`${dataTestId}-5-min-label`}
            >
              Last 5 minutes
            </StyledTitleMinutesTypography>
          </StyledDataTime5MinutesGrid>

          <StyledBoxValueAndPercentageBox>
            <Grid item xs={7}>
              <StyledTitleValueTypography
                data-test-id={`${dataTestId}-5-min-value`}
              >
                {carbonLast5min.toFixed(2)} {uom}
              </StyledTitleValueTypography>
            </Grid>
            <Grid item xs={5}>
              <TrendPercent
                data-test-id={`${dataTestId}-5-min-trend-percent`}
                value={carbonLast5min}
                preValue={carbonLast10min}
              />
            </Grid>
          </StyledBoxValueAndPercentageBox>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledBoxDottedBox />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid sx={{ position: 'relative' }}>
            <StyledDateTimeGrid>
              <StyledDateRangeIcon
                data-test-id={`${dataTestId}-24-hour-date-range`}
              />
              <StyledTitleMinutesTypography
                data-test-id={`${dataTestId}-24-hour-label`}
              >
                Last 24 hours
              </StyledTitleMinutesTypography>
            </StyledDateTimeGrid>
            <StyledBoxValueAndLineChartBox>
              <StyledDateTimeGrid item xs={7}>
                <StyledTitleValueTypography
                  data-test-id={`${dataTestId}-24-hour-value`}
                >
                  {carbon24h.toFixed(2)} {uom}
                </StyledTitleValueTypography>
              </StyledDateTimeGrid>
              <Grid item xs={5}>
                <Box sx={{ width: '100%' }}>
                  <LineChart
                    dataTestId={`${dataTestId}-24-hour-chart`}
                    data={[
                      {
                        data: carbon ? carbon.map((x: any) => x.value) : [],
                      },
                    ]}
                    color={carbonTrendColor}
                    height={70}
                  />
                </Box>
              </Grid>
            </StyledBoxValueAndLineChartBox>
          </Grid>
        </Grid>
      </Grid>
    </StyledCarbonOutputGrid>
  );
};
