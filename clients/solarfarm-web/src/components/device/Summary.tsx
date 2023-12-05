import { Grid } from '@mui/material';
import { HistoryQuery, HistoryQueryText, Loading } from '@tymlez/frontend-libs';
import type { IIsoDate, ISummaryItem } from '@tymlez/platform-api-interfaces';
import type { FC } from 'react';
import { useSummaryData } from '../../hooks/useSummaryData';
import { Item } from '../common/styles/commonStyles';
import { KeyMetricBlock } from './KeyMetricBlock';
import { StyledTitleRecP } from './styles/summaryStyle';

interface Props {
  historyQuery: HistoryQuery;
}

const iconMap: Record<string, string> = {
  rec: '/logo/license.svg',
  forecast: '/logo/iconEnergy.svg',
  generated: '/logo/sunny.svg',
  abatement: '/logo/CO2Down.svg',
};

export const Summary: FC<Props> = ({ historyQuery }) => {
  const fromDate: IIsoDate = historyQuery.dateRange[0] || '';
  const toDate: IIsoDate = historyQuery.dateRange[1] || '';

  const { data } = useSummaryData(fromDate, toDate);

  return (
    <Item data-test-id="solarfarm-analytics-summary">
      <StyledTitleRecP data-test-id="solarfarm-analytics-summary-title">
        Key Metrics
      </StyledTitleRecP>

      <HistoryQueryText
        fromDate={new Date(fromDate)}
        toDate={new Date(toDate)}
        dataTestId="solarfarm-analytics-summary-date-range"
      />
      <Grid
        data-test-id="solarfarm-analytics-summary-energy-components"
        container
        item
        xs={12}
        md={12}
        spacing={3}
        style={{ marginTop: '-10px' }}
      >
        {data ? (
          data.map((energy: ISummaryItem) => {
            return (
              <Grid item xs={12} sm={6} md={6} xl={3} lg={3}>
                <KeyMetricBlock
                  dataTestId={`solarfarm-analytics-summary-energy-component-${energy.name}`}
                  key={energy.name}
                  src={iconMap[energy.name]}
                  data={energy}
                  from={fromDate}
                  to={toDate}
                />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} md={12}>
            <Item>
              <Loading dataTestId="solarfarm-analytics-summary-loading" />
            </Item>
          </Grid>
        )}
      </Grid>
    </Item>
  );
};
