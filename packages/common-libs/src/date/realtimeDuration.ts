export function getRealtimeDuration(intervalInMinutes = 5) {
  const to = new Date().getTime() - 5 * 60 * 1000; //get 5min before to have data available
  const from = to - intervalInMinutes * 60 * 1000; //5 minutes
  return { from, to };
}
