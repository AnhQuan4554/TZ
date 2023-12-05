import type { FC } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { StyledTrendPrecentSuccessBox, StyledTrendPrecentErrorBox } from './styled-components';

export interface ITrendProps {
  value: number;
  preValue: number;
  dataTestId?: string;
}

export const TrendPercent: FC<ITrendProps> = ({ value, preValue, dataTestId }) => {
  const trendPercent: number =
    preValue !== 0 ? Math.round(((value - preValue) / preValue) * 100) : 0;
  if (trendPercent >= 0) {
    return (
      <StyledTrendPrecentSuccessBox data-test-id={dataTestId}>
        <ArrowUpwardIcon color="success" />
        {trendPercent} %
      </StyledTrendPrecentSuccessBox>
    );
  }

  return (
    <StyledTrendPrecentErrorBox data-test-id={dataTestId}>
      <ArrowDownwardIcon color="error" />
      {trendPercent} %
    </StyledTrendPrecentErrorBox>
  );
};
