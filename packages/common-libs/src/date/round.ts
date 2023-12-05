export function dateRound(date: Date | string, minutes: number) {
  const coeff = 1000 * 60 * minutes;
  return new Date(Math.floor(new Date(date).getTime() / coeff) * coeff);
}
