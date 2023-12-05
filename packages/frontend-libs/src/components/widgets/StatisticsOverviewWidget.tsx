import type { FC } from 'react';
import type React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { formatNumber } from '@tymlez/common-libs';
import type { IPoint } from '../../utils/TEMPORARY';
import { Image } from '../../utils/Image';
import { TrendIcon } from '../trend/TrendIcon';
import { LineChart } from '../charts/LineChart';
import Loading from '../loading/Loading';
import { StyledStatisticsOverviewWidgetBox } from './styled-components';
import {
  AlignItemsCenterCard,
  AlignJustifyFlexEndGrid,
  JustifyContentCenterBox,
} from '../common/styled-components';

interface Props {
  title?: React.ReactNode | string;
  value?: string;
  unit?: string;
  percentageChange?: number;
  percentageDuration?: string;
  isLoading: boolean;
  isError?: boolean;
  sx?: React.CSSProperties;
  imgSrc?: string;
  showTrend?: boolean;
  data?: IPoint[];
  showMiniChart?: boolean;
  dataTestId?: string;
}

export const StatisticsOverviewWidget: FC<Props> = ({
  title,
  value,
  unit,
  percentageChange,
  percentageDuration,
  isLoading,
  isError = false,
  sx,
  imgSrc,
  showTrend = true,
  data,
  showMiniChart,
  dataTestId,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  const trendColor = (percentageChange as number) < 0 ? '#f44336' : '#4caf50';

  return (
    <AlignItemsCenterCard elevation={12} data-test-id={dataTestId}>
      <StyledStatisticsOverviewWidgetBox
        sx={{
          ...sx,
        }}
      >
        {isError ? (
          <JustifyContentCenterBox>
            <Typography variant="caption" color="error">
              There is an error requesting this resources. Please try again later.
            </Typography>
          </JustifyContentCenterBox>
        ) : (
          <Box sx={{ width: '100%' }}>
            <Typography color="textSecondary" variant="subtitle2">
              {title}
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={8} xl={9}>
                <Typography
                  color="textPrimary"
                  variant="h4"
                  sx={{
                    mb: 1,
                    mt: 1.5,
                  }}
                >
                  {formatNumber(Number(value), 6)} {unit}
                </Typography>

                <Typography sx={{ mr: 1 }} color={trendColor} variant="h6" component="span">
                  {Math.abs(percentageChange as number)}%
                </Typography>
                <TrendIcon showTrend={showTrend} percentageChange={percentageChange} />
                <Typography color="textSecondary" variant="caption">
                  {percentageDuration}
                </Typography>
              </Grid>
              <AlignJustifyFlexEndGrid item xs={12} sm={4} xl={3}>
                {imgSrc && <Image src={imgSrc} width="64px" height="64px" />}
                {showMiniChart && (
                  <LineChart
                    data={[
                      {
                        data: data && data.map((x: any) => x.y || 0),
                      },
                    ]}
                    color={trendColor}
                    width={120}
                  />
                )}
              </AlignJustifyFlexEndGrid>
            </Grid>
          </Box>
        )}
      </StyledStatisticsOverviewWidgetBox>
    </AlignItemsCenterCard>
  );
};
