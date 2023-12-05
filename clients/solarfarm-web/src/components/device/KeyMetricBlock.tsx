import type { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { TrendPercent, LineChart, Loading } from '@tymlez/frontend-libs';
import type { IIsoDate, ISummaryItem } from '@tymlez/platform-api-interfaces';
import { formatNumber } from '@tymlez/common-libs';
import {
  useSummarySeries,
  useSummaryPreValue,
} from '../../hooks/useSummaryData';
import { Item } from '../common/styles/commonStyles';
import {
  StyledCardGrid,
  StyledCardTitleText,
  StyledResultTypography,
  SummaryStyle,
} from './styles/summaryStyle';

interface Props {
  data: ISummaryItem;
  src: string;
  from: IIsoDate;
  to: IIsoDate;
  dataTestId?: string;
}

export const KeyMetricBlock: FC<Props> = ({
  data,
  src,
  from,
  to,
  dataTestId,
}) => {
  const classes = SummaryStyle();
  const { data: series, isLoading: isLoadingSeriesData } = useSummarySeries(
    from,
    to,
    data.name,
  );
  const { data: preValue, isLoading } = useSummaryPreValue(from, to, data.name);

  // eslint-disable-next-line no-param-reassign
  data.preValue = preValue || 0;
  const trendColor = data.value >= data.preValue ? '#27C281' : '#CF372C';

  if (isLoading || isLoadingSeriesData) {
    return <Loading dataTestId={`${dataTestId}-loading`} />;
  }

  if (series && series.length > 0) {
    const lineChartData = series.map((x: any) => x.value);
    return (
      <Item data-test-id={`${dataTestId}-with-chart`}>
        <StyledCardGrid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              data-test-id={`${dataTestId}-img`}
              src={src}
              alt={data.label}
              style={{ width: '40px' }}
            />
            <StyledCardTitleText data-test-id={`${dataTestId}-label`}>
              {data.label}
            </StyledCardTitleText>
          </Grid>
        </StyledCardGrid>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid item xs={12} sm={12} md={12} xl={4} lg={4}>
            <LineChart
              dataTestId={`${dataTestId}-line-chart`}
              data={[{ data: lineChartData }]}
              color={trendColor}
              height={70}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} xl={4} lg={4}>
            <StyledResultTypography data-test-id={`${dataTestId}-value`}>
              {data.value.toFixed(2)} {data.uom}
            </StyledResultTypography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} xl={4} lg={4}>
            <TrendPercent
              value={data.value}
              preValue={data.preValue}
              dataTestId={`${dataTestId}-trend-percent`}
            />
          </Grid>
        </Grid>
      </Item>
    );
  }

  return (
    <Item>
      <Grid
        data-test-id={`${dataTestId}-without-chart`}
        container
        style={{ height: '100%', display: 'flex', alignItems: 'center' }}
      >
        <Grid
          data-test-id={`${dataTestId}-img`}
          item
          xs={4}
          sm={4}
          md={4}
          xl={3}
          lg={3}
        >
          <img
            src={src}
            alt={data.label}
            style={{ width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          xl={9}
          lg={9}
          style={{ textAlign: 'center' }}
        >
          <p
            data-test-id={`${dataTestId}-label`}
            className={classes.metricLabel}
          >
            {data.label}
          </p>
          <Typography
            data-test-id={`${dataTestId}-value`}
            className={classes.metricValue}
          >
            {formatNumber(data.value)} {data.uom}
          </Typography>
        </Grid>
      </Grid>
    </Item>
  );
};
