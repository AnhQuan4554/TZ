export function isoToNanoSecondTimestamp(dt: string): string {
  const milliseconds = new Date(dt).getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const milli = String(milliseconds).slice(-3);
  return `${seconds}.${milli}000000`;
}

export function nanoSecondTimestampToIso(dt: string): string {
  return new Date(parseFloat(dt) * 1000).toISOString();
}

export function shiftNanoSecondTimestamp(
  dt: string,
  secondDelta: number,
): string {
  const parts = dt.split('.');
  const seconds = parseInt(parts[0], 10) + Math.round(secondDelta);
  return `${seconds}.${parts[1]}`;
}
