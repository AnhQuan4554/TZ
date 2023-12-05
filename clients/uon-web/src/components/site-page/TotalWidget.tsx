import { Grid } from '@mui/material';
import type { FC } from 'react';
import React from 'react';
// import { StatisticsOverviewWidget } from '@tymlez/frontend-libs';
// import { useSummaryData } from '../../hooks/summary';

interface ISummaryWidgetProps {
  source: string;
  icon?: string;
}

export const SummaryWidget: FC<ISummaryWidgetProps> = ({ source, icon }) => {
  console.log(source, icon);

  // const { data, isLoading, isError } = useSummaryData(source);
  return (
    <Grid>{icon}</Grid>
    // <StatisticsOverviewWidget
    //   {...data}
    //   imgSrc={icon}
    //   isLoading={isLoading}
    //   isError={isError}
    //   showMiniChart={!icon}
    // />
  );
};
