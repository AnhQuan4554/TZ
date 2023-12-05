import type { FC } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Loading } from '../../loading';

interface Props {
  location: string;
}

const containerStyle = {
  maxWidth: '100%',
  height: '320px',
  marginTop: '8px',
};

const GoogleMaps: FC<Props> = ({ location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBSNsemeGNtl0nxwfZdQ5a0nqB2J7S_OEY',
  });
  const center = {
    lat: Number(location[0]),
    lng: Number(location[1]),
  };

  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <GoogleMap
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [],
        },
      }}
      zoom={10}
      center={center}
      mapContainerStyle={containerStyle}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
export default GoogleMaps;
