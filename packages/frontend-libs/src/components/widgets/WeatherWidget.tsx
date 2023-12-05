import type { FC } from 'react';
import type React from 'react';
import { Grid, Typography } from '@mui/material';
import type { IWeatherData } from '@tymlez/platform-api-interfaces';
import { Loading } from '../loading';
import {
  AlignItemsCenterCard,
  AlignCenterJustifySpaceAroundBox,
  AlignJustifyTextAlignCenterGrid,
} from '../common/styled-components';

export interface IWeatherWidgetProps {
  sx?: React.CSSProperties;
  color?: string;
  data: IWeatherData | null;
  loading: boolean;
  dataTestId?: string;
}

export const WeatherWidget: FC<IWeatherWidgetProps> = ({
  sx,
  color,
  data,
  loading,
  dataTestId,
}) => {
  return (
    <AlignItemsCenterCard elevation={12} data-test-id={dataTestId}>
      <AlignCenterJustifySpaceAroundBox
        sx={{
          ...sx,
          color,
        }}
      >
        {!loading &&
        data &&
        data.weather?.length &&
        data.weather[0]?.icon &&
        data.main?.temp &&
        data.weather[0]?.description ? (
          <AlignJustifyTextAlignCenterGrid container spacing={1}>
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <img
                style={{ width: 100 }}
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt="weather"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Typography data-test-id={`${dataTestId}-temperature`} variant="h4">{`${Math.round(
                data?.main.temp
              )} °C`}</Typography>
              <Typography
                data-test-id={`${dataTestId}-description`}
                variant="body2"
                color="primary"
              >
                {data?.weather[0].description}
              </Typography>
            </Grid>
          </AlignJustifyTextAlignCenterGrid>
        ) : (
          <Loading dataTestId={`${dataTestId}-loading`} />
        )}
      </AlignCenterJustifySpaceAroundBox>
    </AlignItemsCenterCard>
  );
};
