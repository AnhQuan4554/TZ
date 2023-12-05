import axios from 'axios';
import { useQuery } from 'react-query';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { round } from 'lodash';

export interface IPoint {
  x: number | Date;
  y: number;
}

export interface IDashboardBlockSummary {
  title: string;
  value: number;
  percentageChange: number;
  percentageDuration: string;
  data?: IPoint[];
}

export const getSummaryInfo = () => {
  return [
    {
      metricKey: 'carbon-emission',
      title: 'Total Carbon Emissions',
      unit: 'kg',
      icon: '/icons/CO2.svg',
    },
    {
      metricKey: 'carbon-abatement',
      title: 'Total Carbon Abatement',
      unit: 'kg',
      icon: '/icons/downCO2.svg',
    },
    {
      metricKey: 'net-carbon-emissions',
      title: 'Net Carbon Emissions',
      unit: 'kg',
      icon: '/icons/carbon.svg',
    },
    {
      metricKey: 'fossil-fuel-usage',
      title: 'Fossil Fuel Usage',
      unit: 'kWh',
      icon: '/icons/fossil.svg',
    },
    {
      metricKey: 'green-energy-usage',
      title: 'Green Energy Usage',
      unit: 'kWh',
      icon: '/icons/solarSupplied.svg',
    },
    {
      metricKey: 'water-pumped',
      title: 'Total Water Pumped',
      unit: 'kL',
      icon: '/icons/water.svg',
    },
  ];
};

export const useSummaryData = (
  metric: string,
  from: IIsoDate,
  to: IIsoDate,
) => {
  const params = { from, to };
  return useQuery<any>(
    [`summary-${metric}`, params],
    async () => {
      const { data } = await axios.get<Promise<IDashboardBlockSummary>>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/dashboard/summary/${metric}`,
        { params },
      );

      return data;
    },
    {
      staleTime: Infinity,
    },
  );
};

export const getCarbonIntensity = (data: IDashboardBlockSummary[]) => {
  const waterSummary: IDashboardBlockSummary = data.filter(
    (item) => item.title === 'Total Water Pumped',
  )[0];
  const emissionSummary: IDashboardBlockSummary = data.filter(
    (item) => item.title === 'Total Carbon Emissions',
  )[0];
  const value =
    +waterSummary.value > 0 ? +emissionSummary.value / +waterSummary.value : 0;
  const lastWaterValue =
    +waterSummary.value / (1 + waterSummary.percentageChange / 100);
  const lastEmissionValue =
    +emissionSummary.value / (1 + emissionSummary.percentageChange / 100);
  const lastValue = lastWaterValue > 0 ? lastEmissionValue / lastWaterValue : 0;
  const change = lastValue > 0 ? (value - lastValue) / lastValue : 0;
  const percentageChange = round(change * 100, 2);

  return {
    title: 'Kg Co2eq/kL Water Pumped',
    unit: 'kg',
    value: round(value, 6),
    percentageChange,
  };
};
