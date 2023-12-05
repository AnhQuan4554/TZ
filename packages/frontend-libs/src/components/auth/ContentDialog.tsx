import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { format, getTimezoneOffset, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
export const StyledContenDialogGrid = styled(Grid)(() => ({
  position: 'relative',
  margin: '0',
  width: '460px',
  height: '194px',
  //   overflow: 'hidden',
}));
export const StyledWrapContent = styled(Box)(() => ({
  padding: '24px',
}));
export const StyledSwitchShow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
export const ContentDialog = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  let formatTimeZone = '';
  const moment = require('moment-timezone');
  const timezone = 'Australia/Sydney';
  const now = new Date();
  const timezoneAbbr = moment.tz(now, timezone).format('z');
  const timezoneName = moment.tz(now, timezone).zoneAbbr();
  console.log(timezoneAbbr); // AEST
  console.log(timezoneName, 'll'); // Australian Eastern Standard Time
  const position = [10.8231, 106.6297];
  return (
    <StyledContenDialogGrid container spacing={2}>
      <Grid xs={6} sx={{ overflow: 'hidden' }}>
        {/* <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="../testImg.svg"
          alt=""
        /> */}
        {typeof window !== 'undefined' && (
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </Grid>
      <Grid xs={6}>
        <StyledWrapContent>
          <StyledSwitchShow>
            <Box>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#293343',
                }}
              >
                Show local
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#293343',
                }}
              >
                time zone
              </Typography>
            </Box>

            <Switch {...label} />
          </StyledSwitchShow>
          <Typography
            sx={{
              marginTop: '24px',
              color: '#5C6A82',
              fontWeight: '500',
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            {formatTimeZone}
          </Typography>
        </StyledWrapContent>
      </Grid>
    </StyledContenDialogGrid>
  );
};

export default ContentDialog;
