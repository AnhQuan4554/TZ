import type { FC } from 'react';
import { CardContent, Box } from '@mui/material';
import { formatNumber } from '@tymlez/common-libs';
import { useTheme } from '@mui/material/styles';
import type { ISingleBlock } from './MultiMetricBlock';
import { StyledSingleMetricBlockRoot, StyledSingleMetricBlockText } from './styled-components';

export const SingleMetricBlock: FC<ISingleBlock> = ({
  title,
  icon,
  value,
  uom,
  background,
  sx,
  dataTestId,
}) => {
  const testTitle = title.toLowerCase().replaceAll(' ', '-');
  const updatedDataTestId = `${dataTestId}-${testTitle}`;

  const theme = useTheme();
  return (
    <StyledSingleMetricBlockRoot
      data-test-id={updatedDataTestId}
      sx={{
        background: background || '',
        ...sx,
      }}
    >
      <Box
        component="img"
        src={icon}
        alt="icon"
        sx={{
          width: {
            xs: theme.spacing(8),
            sm: theme.spacing(5),
          },
          height: {
            xs: theme.spacing(8),
            sm: theme.spacing(5),
          },
        }}
      />

      <CardContent>
        <StyledSingleMetricBlockText data-test-id={`${updatedDataTestId}-title`}>
          {title}
        </StyledSingleMetricBlockText>
        <StyledSingleMetricBlockText data-test-id={`${updatedDataTestId}-value`}>
          {formatNumber(+value)} {uom}
        </StyledSingleMetricBlockText>
      </CardContent>
    </StyledSingleMetricBlockRoot>
  );
};
