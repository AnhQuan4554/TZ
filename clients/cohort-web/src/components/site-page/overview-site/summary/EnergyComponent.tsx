import type { FC } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { TrendPercent, LineChart, Loading } from '@tymlez/frontend-libs';
import { formatNumber } from '@tymlez/common-libs';
import type { ISummaryItem } from '@tymlez/platform-api-interfaces';
import {
  StyledContainerGrid,
  StyledJcCenterGrid,
  StyledJcFlexEndGrid,
  StyledJcFlexStartGrid,
  StyledKeyMetricsMobileGrid,
  StyledMetricTitleTypography,
  StyledMetricValueTypography,
  StyledTitleValueTypography,
  StyledValueGrid,
} from '../../styled-components';

interface Props {
  index: number;
  data: ISummaryItem;
  src: string;
  screen?: string;
  mainItem?: number;
  dataTestId?: string;
}

export const EnergyComponent: FC<Props> = ({
  data,
  src,
  index,
  screen,
  mainItem,
  dataTestId,
}) => {
  const trendColor = data.value >= data.preValue ? '#27C281' : '#CF372C';
  const testTitle = data.label.toLowerCase().replaceAll(' ', '-');
  const updateDataTest = `${dataTestId}-${screen}-${testTitle}`;

  if (screen === 'mobile') {
    if (mainItem === index) {
      return (
        <Grid data-test-id={updateDataTest}>
          <StyledKeyMetricsMobileGrid>
            <Paper
              square
              elevation={0}
              sx={{
                bgcolor: 'background.default',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                data-test-id={`${updateDataTest}-image`}
                src={src}
                alt={data.label}
              />

              <Typography
                data-test-id={`${updateDataTest}-label`}
                sx={{ ml: 3 }}
              >
                {data.label}
              </Typography>
            </Paper>
            <Box sx={{ width: '100%' }}>
              {data && data.series ? (
                <LineChart
                  dataTestId={`${updateDataTest}-chart`}
                  data={[{ data: data.series?.map((x: any) => x.value) }]}
                  color={trendColor}
                  height={70}
                />
              ) : (
                <Loading dataTestId={`${updateDataTest}-chart-loading`} />
              )}
            </Box>
            <StyledValueGrid>
              <Grid>
                <StyledTitleValueTypography>
                  {data && data.series ? (
                    <Typography data-test-id={`${updateDataTest}-value`}>
                      {formatNumber(data.value)} {data.uom}
                    </Typography>
                  ) : (
                    <Loading dataTestId={`${updateDataTest}-value-loading`} />
                  )}
                </StyledTitleValueTypography>
              </Grid>
              <TrendPercent
                dataTestId={`${updateDataTest}-trend-percent`}
                value={data.value}
                preValue={data.preValue}
              />
            </StyledValueGrid>
          </StyledKeyMetricsMobileGrid>
        </Grid>
      );
    }
  }
  if (screen === 'desktop') {
    return (
      <StyledContainerGrid container data-test-id={updateDataTest}>
        <Grid item xs={4} sm={2} md={1}>
          <img
            data-test-id={`${updateDataTest}-image`}
            style={{
              width: '48px',
            }}
            src={src}
            alt={data.label}
          />
        </Grid>
        <StyledJcFlexStartGrid item xs={8} sm={3} md={4}>
          <StyledMetricTitleTypography data-test-id={`${updateDataTest}-label`}>
            {data.label}
          </StyledMetricTitleTypography>
        </StyledJcFlexStartGrid>
        <StyledJcCenterGrid>
          {data && data.series ? (
            <LineChart
              data={[{ data: data.series?.map((x: any) => x.value) }]}
              color={trendColor}
              width={120}
              dataTestId={`${updateDataTest}-chart`}
            />
          ) : (
            <Loading dataTestId={`${updateDataTest}-chart-loading`} />
          )}
        </StyledJcCenterGrid>
        <StyledJcFlexEndGrid item xs={12} sm={4} md={4}>
          {data && data.series ? (
            <StyledMetricValueTypography
              data-test-id={`${updateDataTest}-value`}
            >
              {formatNumber(data.value)} {data.uom}
            </StyledMetricValueTypography>
          ) : (
            <Loading dataTestId={`${updateDataTest}-value-loading`} />
          )}

          <TrendPercent
            value={data.value}
            preValue={data.preValue}
            dataTestId={`${updateDataTest}-trend-percent`}
          />
        </StyledJcFlexEndGrid>
      </StyledContainerGrid>
    );
  }
  return <Grid />;
};
