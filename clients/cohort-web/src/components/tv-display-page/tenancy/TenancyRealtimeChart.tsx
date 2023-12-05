import type { FC } from 'react';
import { StaticTimeline } from '@tymlez/frontend-libs';
import type { ITenancyDataResult } from '@tymlez/platform-api-interfaces';
import { tenancySeriesToChart } from '../../common/energy/energy-utils';
import { circuitsColorMap } from '../../common/circuit/utils';

interface Props {
  data: ITenancyDataResult[];
  isLoading: boolean;
  dataTestId?: string;
}

export const TenancyRealTimeChart: FC<Props> = ({
  data,
  isLoading,
  dataTestId,
}) => {
  const data3hours = data.map((item) => {
    return {
      name: item.name,
      data: item.data.slice(-36),
    };
  });

  const chartSeries = data3hours
    ? tenancySeriesToChart(data3hours, circuitsColorMap)
    : [];

  return (
    <StaticTimeline
      dataTestId={dataTestId}
      isLoading={isLoading}
      series={chartSeries}
      selectChartType={false}
      yTitle="kilowatt-hours (kWh)"
      height="200"
      title="Real Time Tenancy"
      customStyle={{
        '> .MuiCardHeader-root': {
          padding: '16px',
        },
      }}
    />
  );
};
