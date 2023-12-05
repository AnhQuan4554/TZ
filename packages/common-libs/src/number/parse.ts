export function parseNumber(input: any): number {
  const value = Number(input);

  if (
    isNaN(value) ||
    value === Infinity ||
    value === undefined ||
    value === null
  ) {
    return 0;
  }
  return value;
}
