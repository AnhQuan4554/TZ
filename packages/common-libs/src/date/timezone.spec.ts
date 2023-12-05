import { getTimezoneOffset, convertTimezone, forceTimezone } from './timezone';

describe('getTimezoneOffset', () => {
  it('should return timezone offset', () => {
    expect(getTimezoneOffset(new Date(2022, 0, 1), 'America/New_York')).toBe(
      300,
    );
    expect(getTimezoneOffset(new Date(2022, 6, 1), 'America/New_York')).toBe(
      240,
    );
    expect(getTimezoneOffset(new Date(2022, 0, 1), 'Australia/Melbourne')).toBe(
      -660,
    );
    expect(getTimezoneOffset(new Date(2022, 6, 1), 'Australia/Melbourne')).toBe(
      -600,
    );
  });
});

describe('convertTimezone', () => {
  it('should convert Date to Melbourne', () => {
    const res1 = convertTimezone(
      new Date('2022-01-22T23:39:30.000Z'),
      'Australia/Melbourne',
    );

    expect(res1.getFullYear()).toBe(2022);
    expect(res1.getMonth()).toBe(0);
    expect(res1.getDate()).toBe(23);
    expect(res1.getHours()).toBe(10);

    const res2 = convertTimezone(
      new Date('2022-06-22T23:39:30.000Z'),
      'Australia/Melbourne',
    );
    expect(res2.getFullYear()).toBe(2022);
    expect(res2.getMonth()).toBe(5);
    expect(res2.getDate()).toBe(23);
    expect(res2.getHours()).toBe(9);

    const res3 = convertTimezone(
      new Date('2022-01-22T03:39:30.000Z'),
      'Australia/Melbourne',
    );

    expect(res3.getFullYear()).toBe(2022);
    expect(res3.getMonth()).toBe(0);
    expect(res3.getDate()).toBe(22);
    expect(res3.getHours()).toBe(14);

    const res4 = convertTimezone(
      new Date('2022-06-22T03:39:30.000Z'),
      'Australia/Melbourne',
    );
    expect(res4.getFullYear()).toBe(2022);
    expect(res4.getMonth()).toBe(5);
    expect(res4.getDate()).toBe(22);
    expect(res4.getHours()).toBe(13);
  });

  it('should convert Date to NewYork', () => {
    const res1 = convertTimezone(
      new Date('2022-01-22T23:39:30.000Z'),
      'America/New_York',
    );

    expect(res1.getFullYear()).toBe(2022);
    expect(res1.getMonth()).toBe(0);
    expect(res1.getDate()).toBe(22);
    expect(res1.getHours()).toBe(18);

    const res2 = convertTimezone(
      new Date('2022-06-22T23:39:30.000Z'),
      'America/New_York',
    );
    expect(res2.getFullYear()).toBe(2022);
    expect(res2.getMonth()).toBe(5);
    expect(res2.getDate()).toBe(22);
    expect(res2.getHours()).toBe(19);

    const res3 = convertTimezone(
      new Date('2022-01-22T03:39:30.000Z'),
      'America/New_York',
    );

    expect(res3.getFullYear()).toBe(2022);
    expect(res3.getMonth()).toBe(0);
    expect(res3.getDate()).toBe(21);
    expect(res3.getHours()).toBe(22);

    const res4 = convertTimezone(
      new Date('2022-06-22T03:39:30.000Z'),
      'America/New_York',
    );
    expect(res4.getFullYear()).toBe(2022);
    expect(res4.getMonth()).toBe(5);
    expect(res4.getDate()).toBe(21);
    expect(res4.getHours()).toBe(23);
  });
});

describe('forceTimezone', () => {
  it('should force Date to Melbourne time', () => {
    const res1 = forceTimezone(
      new Date('2022-01-22T23:39:30.000Z'),
      'Australia/Melbourne',
    );

    expect(res1.toISOString()).toBe('2022-01-22T12:39:30.000Z');
  });
});
