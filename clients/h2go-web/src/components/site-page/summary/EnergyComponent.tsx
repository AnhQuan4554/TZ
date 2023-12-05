import type { FC } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { TrendPercent, LineChart, Loading } from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { formatNumber } from '@tymlez/common-libs';
import {
  StyledContainerGrid,
  StyledHydrogenValueTypography,
  StyledJcCenterGrid,
  StyledJcFlexEndGrid,
  StyledJcFlexStartGrid,
  StyledTitleTypography,
} from './styled-components';
import {
  ISummaryItem,
  useSummaryPreValue,
  useSummarySeries,
} from '../../../hooks/useSummaryData';

interface Props {
  index: number;
  data: ISummaryItem;
  src: string;
  from: IIsoDate;
  to: IIsoDate;
  screen: string;
  mainItem: number;
  dataTestId?: string;
}

export const EnergyComponent: FC<Props> = ({
  data,
  src,
  from,
  to,
  index,
  screen,
  mainItem,
  dataTestId,
}) => {
  const { data: series } = useSummarySeries(from, to, data.name);
  const { data: preValue } = useSummaryPreValue(from, to, data.name);
  // eslint-disable-next-line no-param-reassign
  data.preValue = preValue || 0;
  const trendColor = data.value >= data.preValue ? '#27C281' : '#CF372C';
  const screenDataTest = `${dataTestId}-${screen}`;
  if (screen === 'mobile') {
    if (mainItem === index) {
      return (
        <Grid
          data-test-id={screenDataTest}
          sx={{
            border: '1px solid rgba(145, 158, 171, 0.15)',
            p: 3,
            borderRadius: '4px',
          }}
        >
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <img
              data-test-id={`${screenDataTest}-image`}
              src={src}
              alt={data.label}
            />
            <Typography data-test-id={`${screenDataTest}-label`} sx={{ ml: 3 }}>
              {data.label}
            </Typography>
          </Paper>
          <Box sx={{ width: '100%' }}>
            {series && series ? (
              <LineChart
                dataTestId={`${screenDataTest}-chart`}
                data={[{ data: series?.map((x: any) => x.value) }]}
                color={trendColor}
                height={70}
              />
            ) : (
              <Loading dataTestId={`${screenDataTest}-chart-loading`} />
            )}
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid>
              {series ? (
                <Typography
                  data-test-id={`${screenDataTest}-value`}
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: '#293343',
                  }}
                >
                  {data.value} {data.uom}
                </Typography>
              ) : (
                <Loading dataTestId={`${screenDataTest}-value-loading`} />
              )}
            </Grid>
            {series ? (
              <TrendPercent
                value={data.value}
                preValue={data.preValue}
                dataTestId={`${screenDataTest}-trend-percent`}
              />
            ) : (
              <Loading dataTestId={`${screenDataTest}-trend-percent-loading`} />
            )}
          </Box>
        </Grid>
      );
    }
  }
  if (screen === 'desktop') {
    return (
      <StyledContainerGrid container data-test-id={screenDataTest}>
        <Grid
          item
          xs={4}
          sm={2}
          md={1}
          data-test-id={`${screenDataTest}-image`}
        >
          <img
            style={{
              width: '48px',
            }}
            src={src}
            alt={data.label}
          />
        </Grid>
        <StyledJcFlexStartGrid item xs={8} sm={3} md={4}>
          <StyledTitleTypography data-test-id={`${screenDataTest}-label`}>
            {`${data.label} (${data.uom})`}
          </StyledTitleTypography>
        </StyledJcFlexStartGrid>
        <StyledJcCenterGrid item xs={12} sm={3} md={3}>
          {series && series ? (
            <LineChart
              dataTestId={`${screenDataTest}-chart`}
              data={[{ data: series?.map((x: any) => x.value) }]}
              color={trendColor}
              width={120}
            />
          ) : (
            <Loading dataTestId={`${screenDataTest}-chart-loading`} />
          )}
        </StyledJcCenterGrid>
        <StyledJcFlexEndGrid item xs={12} sm={4} md={4}>
          {series ? (
            <StyledHydrogenValueTypography
              data-test-id={`${screenDataTest}-value`}
            >
              {formatNumber(data.value)} {data.uom}
            </StyledHydrogenValueTypography>
          ) : (
            <Loading data-test-id={`${screenDataTest}-value-loading`} />
          )}
          {series ? (
            <TrendPercent
              value={data.value}
              preValue={data.preValue}
              dataTestId={`${screenDataTest}-trend-percent`}
            />
          ) : (
            <Loading dataTestId={`${screenDataTest}-trend-percent-loading`} />
          )}
        </StyledJcFlexEndGrid>
      </StyledContainerGrid>
    );
  }

  return <Grid />;
};
