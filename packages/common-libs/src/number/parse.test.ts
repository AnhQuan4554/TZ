import { parseNumber } from './parse';

describe('parseNumber', () => {
  it('should parse input into number', () => {
    expect(parseNumber('123')).toBe(123);
    expect(parseNumber('123.333333333')).toBe(123.333333333);
    expect(parseNumber('xxxx')).toBe(0);
    expect(parseNumber('')).toBe(0);
    expect(parseNumber(undefined)).toBe(0);
    expect(parseNumber(null)).toBe(0);
    expect(parseNumber(NaN)).toBe(0);
  });
});
