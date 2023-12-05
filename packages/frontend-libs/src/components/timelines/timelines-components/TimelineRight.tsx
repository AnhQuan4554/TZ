import type { FC } from 'react';
import { Grid, Link } from '@mui/material';
import DividerComponent from './DividerComponent';
import { capitalizeFirstLetter, isValidUrl } from '../../../utils/ConvertText';
import { IconCenterTimeLine } from './IconCenterTimeLine';
import GoogleMaps from '../map-components/MapComponent';
import {
  StyledCategoryTimelineTitle,
  StyledMiscGrid,
  StyledParameterTimeline,
  StyledParameterTimelineValue,
  StyledSubIconGrid,
  StyledTimelineContentGrid,
  StyledTimelineTitle,
} from '../styled-components';

interface Props {
  data: any;
}

const TimelineRight: FC<Props> = ({ data }) => {
  return (
    <Grid container sx={{ alignItems: 'stretch' }}>
      <Grid item xs={5} />
      <Grid item container xs={2} sx={{ display: 'block' }}>
        <Grid item xs={12} container spacing={0}>
          <IconCenterTimeLine data={data} />
        </Grid>
        <Grid item xs={12} container spacing={0} sx={{ height: 'calc(100% - 54px)' }}>
          <Grid item xs={12}>
            <DividerComponent />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5} sx={{ marginTop: '24px' }}>
        <StyledTimelineContentGrid container sx={{ borderLeft: `10px solid ${data.color}` }}>
          <Grid item xs={9} md={9} style={{ lineHeight: '25px' }}>
            {data.category ? (
              <Grid>
                <StyledCategoryTimelineTitle>{data.category}</StyledCategoryTimelineTitle>
                <StyledTimelineTitle>{data.name}</StyledTimelineTitle>
              </Grid>
            ) : (
              <StyledCategoryTimelineTitle>{data.name}</StyledCategoryTimelineTitle>
            )}
          </Grid>
          <StyledSubIconGrid item xs={3} md={3}>
            <img src={data.subIcon} alt="settingicon" />
          </StyledSubIconGrid>
          <Grid item xs={12} md={12}>
            <Grid sx={{ display: 'flex' }}>
              <StyledParameterTimeline>Time : </StyledParameterTimeline>
              <StyledParameterTimelineValue>{data.time}</StyledParameterTimelineValue>
            </Grid>
            <Grid sx={{ display: 'flex' }}>
              <StyledParameterTimeline>Date : </StyledParameterTimeline>
              <StyledParameterTimelineValue>{data.date}</StyledParameterTimelineValue>
            </Grid>
            <Grid sx={{ display: 'flex' }}>
              <StyledParameterTimeline>Input : </StyledParameterTimeline>
              <StyledParameterTimelineValue>{data.input}</StyledParameterTimelineValue>
            </Grid>
            {data.misc &&
              Object.keys(data.misc).map((key) => {
                if (data.misc[key] !== '') {
                  return (
                    <StyledMiscGrid key={`item-right-${key}`}>
                      <StyledParameterTimeline>
                        {capitalizeFirstLetter(key)} :{' '}
                        {isValidUrl(data.misc[key]) ? (
                          <Link href={data.misc[key]} target="_blank">
                            {data.misc[key]}
                          </Link>
                        ) : (
                          <StyledParameterTimelineValue>
                            {data.misc[key]}
                          </StyledParameterTimelineValue>
                        )}
                      </StyledParameterTimeline>
                    </StyledMiscGrid>
                  );
                }
                /* eslint-disable */
                return <></>;
              })}
          </Grid>
          <Grid item xs={12}>
            {data.misc.location && <GoogleMaps location={data.misc.location.split(/[\s,]+/)} />}
          </Grid>
        </StyledTimelineContentGrid>
      </Grid>
    </Grid>
  );
};

export default TimelineRight;
