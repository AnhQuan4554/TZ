export function parseGPSLocationString(locationString: string): {
  lat: string;
  long: string;
} {
  if (locationString.startsWith('-')) {
    const [longitude, ...reset] = locationString.substring(1).split('-');
    return { long: `-${longitude}`, lat: reset.join('-') };
  }

  const [longitude, ...reset] = locationString.split('-');
  return { long: longitude, lat: reset.join('-') };
}
