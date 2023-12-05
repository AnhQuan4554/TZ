import type { FC } from 'react';
import { Grid } from '@mui/material';
import { StyledIconCenterTimelineGrid } from '../styled-components';

interface Props {
  data: {
    color: string;
    icon: string;
  };
}
export const IconCenterTimeLine: FC<Props> = ({ data }) => {
  return (
    <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
      <StyledIconCenterTimelineGrid
        sx={{
          background: String(data.color),
        }}
      >
        <img src={data.icon} alt="icon" />
      </StyledIconCenterTimelineGrid>
    </Grid>
  );
};
