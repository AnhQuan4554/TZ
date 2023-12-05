import type { FC } from 'react';
import { Grid } from '@mui/material';
import { LineChart, Loading } from '@tymlez/frontend-libs';
import { formatNumber } from '@tymlez/common-libs';
import type { ISummaryItem } from '@tymlez/platform-api-interfaces';
import {
  useSummarySeries,
  useSummaryPreValue,
} from '../../../hooks/useSummaryRealtimeData';
import {
  StyledCardNameGrid,
  StyledCardTitleGrid,
  StyledCircleBox,
  StyledCircleImg,
  StyledDataGrid,
  StyledDateTodayP,
  StyledIconDateRange,
  StyledImgTitle,
  StyledRealTimeUpdateGrid,
  StyledTitleCardP,
  Item,
} from '../../common/styles/commonStyles';

interface Props {
  data: ISummaryItem;
  src: string;
  dataTestId?: string;
}

export const EnergyComponent: FC<Props> = ({ data, src, dataTestId }) => {
  const { data: series } = useSummarySeries(data.name);
  const { data: preValue } = useSummaryPreValue(data.name);

  const trendColor = data.value >= (preValue || 0) ? '#27C281' : '#CF372C';

  return (
    <Grid item xs={12} md={12} data-test-id={dataTestId}>
      <Item sx={{ pb: 0 }}>
        <StyledCardNameGrid>
          <StyledCardTitleGrid>
            <StyledImgTitle
              data-test-id={`${dataTestId}-image`}
              src={src}
              alt={data.label}
            />

            <StyledTitleCardP data-test-id={`${dataTestId}-header`}>
              {data.label}
            </StyledTitleCardP>
          </StyledCardTitleGrid>
          <StyledCircleBox
            sx={{
              '@keyframes animateCricle': {
                '0%': {
                  border: 'solid 5px #E9D1D1ß',
                },
                '25%': {
                  border: 'solid 5px #E9D1D1',
                },
                '100%': {
                  border: 'solid 5px #e68e8e',
                },
              },
              animation: 'animateCricle 1s 0s forwards ease-in-out infinite',
            }}
          >
            <StyledCircleImg src="/logo/circle.svg" alt="circle" />
          </StyledCircleBox>
        </StyledCardNameGrid>
        <StyledRealTimeUpdateGrid>
          <StyledIconDateRange />
          <StyledDateTodayP data-test-id={`${dataTestId}-label`}>
            Last 5 minutes
          </StyledDateTodayP>
        </StyledRealTimeUpdateGrid>
        <StyledDataGrid>
          <Grid item xs={12} md={6}>
            <StyledTitleCardP data-test-id={`${dataTestId}-value`}>
              {data.name === 'panel'
                ? `${formatNumber(data.value)} / 20,000`
                : `${data.value.toFixed(2)} ${data.uom}`}
            </StyledTitleCardP>
          </Grid>
          <Grid item xs={12} md={6}>
            {series ? (
              <LineChart
                dataTestId={`${dataTestId}-line-chart`}
                data={[{ data: series?.map((x: any) => x.value) }]}
                color={trendColor}
                height={70}
              />
            ) : (
              <Loading dataTestId={`${dataTestId}-line-chart-loading`} />
            )}
          </Grid>
        </StyledDataGrid>
      </Item>
    </Grid>
  );
};
