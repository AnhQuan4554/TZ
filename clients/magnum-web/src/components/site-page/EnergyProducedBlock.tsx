import type { FC } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { LineChart, Loading, useBreakpoint } from '@tymlez/frontend-libs';
import type {
  ISeriesItem,
  ISingleValueHttpResponse,
} from '@tymlez/platform-api-interfaces';
import { formatNumber } from '@tymlez/common-libs';
import type { ISummaryItem } from '../../hooks/useSummaryData';
import {
  StyledContainerBox,
  StyledLabelBox,
  StyledLabelTypography,
  StyledNumberTypography,
  StyledNumberValueTypography,
  StyledSummaryFinalBox,
  StyledSummaryFinalTypography,
  StyledTrendLineTypography,
} from './styled-components';

interface Props {
  title: string;
  data?: ISingleValueHttpResponse<{
    summary: ISummaryItem[];
    outputSeries: ISeriesItem[];
  }>;
  hasEmptyLine?: boolean;
  dataTestId?: string;
}

export const EnergyProducedBlock: FC<Props> = ({
  title,
  data,
  hasEmptyLine,
  dataTestId,
}) => {
  const isSmallScreen = useBreakpoint('md', 'down');

  if (!data?.data) {
    return <Loading />;
  }
  const { summary, outputSeries } = data.data;
  const summaryDetail = summary.slice(0, summary.length - 1);
  const summaryFinal = summary[summary.length - 1];

  return (
    <StyledContainerBox data-test-id={dataTestId}>
      <Typography data-test-id={`${dataTestId}-title`}>{title}</Typography>
      {summaryDetail.map((d: ISummaryItem) => {
        return (
          <StyledLabelBox key={d.name}>
            <Grid
              data-test-id={`${dataTestId}-${d.name}`}
              container
              spacing={2}
            >
              <Grid item xs={6} md={6}>
                <StyledLabelTypography
                  data-test-id={`${dataTestId}-${d.name}-label`}
                >
                  {d.label}
                </StyledLabelTypography>
              </Grid>
              <Grid item xs={6} md={6} sx={{ textAlign: 'end' }}>
                <StyledNumberTypography
                  data-test-id={`${dataTestId}-${d.name}-value`}
                >
                  {formatNumber(d.value, 0)} {d.uom === 'tonne' ? 't' : d.uom}
                </StyledNumberTypography>
              </Grid>
            </Grid>
          </StyledLabelBox>
        );
      })}
      {hasEmptyLine && !isSmallScreen && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '65px',
              color: 'white',
            }}
          >
            <br />
          </Typography>
        </Box>
      )}
      <Divider />
      <StyledSummaryFinalBox>
        <Grid container spacing={2} data-test-id={`${dataTestId}-final`}>
          <Grid item xs={6} md={6}>
            <StyledSummaryFinalTypography
              data-test-id={`${dataTestId}-final-label`}
            >
              {summaryFinal.label}
            </StyledSummaryFinalTypography>
          </Grid>
          <Grid item xs={6} md={6} sx={{ textAlign: 'end' }}>
            <StyledNumberValueTypography
              data-test-id={`${dataTestId}-final-value`}
            >
              {formatNumber(summaryFinal.value, 0)} {summaryFinal.uom}
            </StyledNumberValueTypography>
          </Grid>
        </Grid>
      </StyledSummaryFinalBox>
      <Divider />
      <StyledLabelBox>
        <StyledTrendLineTypography data-test-id={`${dataTestId}-trend-line`}>
          Trend line
        </StyledTrendLineTypography>

        <LineChart
          data-test-id={`${dataTestId}-line-chart`}
          data={[{ data: outputSeries.map((x: any) => x.value) }]}
          color="#27C281"
          width={120}
        />
      </StyledLabelBox>
    </StyledContainerBox>
  );
};
