import type { FC } from 'react';
import { Box } from '@mui/material';
import { StyledArrowDownIcon, StyledArrowUpIcon } from './styled-components';

export interface ITrendIconProps {
  showTrend: boolean;
  percentageChange?: number;
}

export const TrendIcon: FC<ITrendIconProps> = ({ showTrend, percentageChange = 0 }) => {
  if (showTrend) {
    return (
      <Box
        component="span"
        sx={{
          mr: 1,
        }}
      >
        {percentageChange < 0 ? <StyledArrowDownIcon /> : <StyledArrowUpIcon />}
      </Box>
    );
  }
  return <span />;
};
