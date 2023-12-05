import {
  isoToNanoSecondTimestamp,
  nanoSecondTimestampToIso,
  shiftNanoSecondTimestamp,
} from './datetime';

describe('trustchain datetime', () => {
  it('isoToNanoSecondTimestamp should convert a datetime string to nano second timestamp', () => {
    expect(isoToNanoSecondTimestamp('2023-02-01T00:00:00.000Z')).toBe(
      '1675209600.000000000',
    );
  });

  it('nanoSecondTimestampToIso should convert nano second timestamp to iso datetime string', () => {
    expect(nanoSecondTimestampToIso('1677735485.709421003')).toBe(
      '2023-03-02T05:38:05.709Z',
    );
  });

  it('shiftNanoSecondTimestamp should convert nano second timestamp to iso datetime string', () => {
    expect(shiftNanoSecondTimestamp('1677735485.709421003', 100)).toBe(
      '1677735585.709421003',
    );
    expect(shiftNanoSecondTimestamp('1677735485.709421003', -100)).toBe(
      '1677735385.709421003',
    );
    expect(shiftNanoSecondTimestamp('1677735485.709421003', 0)).toBe(
      '1677735485.709421003',
    );
  });
});
