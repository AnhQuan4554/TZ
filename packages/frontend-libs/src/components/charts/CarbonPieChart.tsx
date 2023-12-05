import type { FC } from 'react';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import _ from 'lodash';
import { Typography } from '@mui/material';
import { AlignJustifyCenterCard } from '../common/styled-components';

export interface ICarbonPieChartProps {
  produced?: number;
  saved?: number;
  isLoading: boolean;
  dataTestId?: string;
}

const CarbonPieChart: FC<ICarbonPieChartProps> = ({ produced, saved, isLoading, dataTestId }) => {
  return (
    <AlignJustifyCenterCard data-test-id={dataTestId} elevation={12}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Typography color="primary" variant="subtitle2" textAlign="center">
            24HR CARBON OUTPUT
          </Typography>
          <Chart
            height="150"
            width="350"
            options={{
              // colors: ['#4878AD', '#4CA781'],
              colors: ['#ffa500', '#75c25d'],
              labels: ['CO2e Produced', 'CO2e Abated'],
              legend: {
                position: 'bottom',
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  offsetY: 0,
                },
              },
              grid: {
                padding: {
                  bottom: -100,
                },
              },
              tooltip: {
                x: {
                  show: false,
                },
                y: {
                  formatter: (val) => {
                    return `${_.round(val, 2)} kg`;
                  },
                },
              },
            }}
            series={[produced || 0, saved || 0]}
            type="donut"
          />
        </div>
      )}
    </AlignJustifyCenterCard>
  );
};

export default CarbonPieChart;
