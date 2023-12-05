import { formatDate, formatDateTimeAu } from './format';

describe('formatDate', () => {
  it('should return formated date', () => {
    expect(formatDate(new Date(2022, 0, 1))).toBe('2022-01-01');
  });
  it('should return formated date with given format', () => {
    expect(formatDate(new Date(2022, 0, 1), 'd MMM yyyy HH')).toBe(
      '1 Jan 2022 00',
    );
  });
  it('should return formated date with given format and timezone', () => {
    expect(
      formatDate(
        new Date('2022-01-22T23:39:30.000Z'),
        'd MMM yyyy HH:mm',
        'America/New_York',
      ),
    ).toBe('22 Jan 2022 18:39');
    expect(
      formatDate(
        new Date('2022-01-22T03:39:30.000Z'),
        'd MMM yyyy HH:mm',
        'America/New_York',
      ),
    ).toBe('21 Jan 2022 22:39');
  });
});
describe('formatDateTimeAu', () => {
  it('should return formated date time for Au', () => {
    expect(formatDateTimeAu(new Date('2022-01-22T23:39:30.000Z'))).toBe('23:39 22/01/2022');
  });
});