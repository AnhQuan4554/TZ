import {
  getStartOfInterval,
  getStartOfHour,
  getStartOfDay,
  getStartOfWeek,
  getStartOfMonth,
  toIIsoDate,
  isoDateTimeToEpochSeconds,
} from './isoDateTime';

describe('IMeterDataUtils', () => {
  describe('toIIsoDate', () => {
    it('should parse input into ISO date', () => {
      expect(toIIsoDate('2022-05-22T23:00:00.000Z')).toBe(
        '2022-05-22T23:00:00.000Z',
      );
      expect(toIIsoDate(1653260400)).toBe('2022-05-22T23:00:00.000Z');
    });
  });

  describe('getStartOfInterval', () => {
    it('should return iso string for start of the interval', () => {
      const startOfDay = getStartOfInterval('2022-05-22T23:39:30.000Z', 300);
      expect(startOfDay).toBe('2022-05-22T23:35:00.000Z');
    });

    it('should return iso string for start of the interval with positive offset', () => {
      const startOfDay = getStartOfInterval('2022-05-22T23:39:30.000Z', 300, 1);
      expect(startOfDay).toBe('2022-05-22T23:40:00.000Z');
    });

    it('should return iso string for start of the interval with negative offset', () => {
      const startOfDay = getStartOfInterval(
        '2022-05-22T23:39:30.000Z',
        300,
        -2,
      );
      expect(startOfDay).toBe('2022-05-22T23:25:00.000Z');
    });
  });

  describe('getStartOfHour', () => {
    it('should return iso string for start of the hour in melbourne time', () => {
      const startOfDay = getStartOfHour('2022-05-22T23:39:30.000Z');
      expect(startOfDay).toBe('2022-05-22T23:00:00.000Z');
    });
  });

  describe('getStartOfDay', () => {
    it('should return iso string for start of the day in melbourne time', () => {
      const startOfDay = getStartOfDay('2022-05-22T23:39:30.000Z', -600);
      expect(startOfDay).toBe('2022-05-22T14:00:00.000Z');
    });

    it('should return iso string for start of the day in new york time', () => {
      const startOfDay = getStartOfDay('2022-05-22T23:39:30.000Z', 240);
      expect(startOfDay).toBe('2022-05-22T04:00:00.000Z');
    });
  });

  describe('getStartOfWeek', () => {
    it('should return iso string for start of the Monday in melbourne time', () => {
      const startOfDay1 = getStartOfWeek('2022-05-22T23:39:30.000Z', -600);
      expect(startOfDay1).toBe('2022-05-22T14:00:00.000Z');

      const startOfDay2 = getStartOfWeek('2022-05-25T23:39:30.000Z', -600);
      expect(startOfDay2).toBe('2022-05-22T14:00:00.000Z');
    });

    it('should return iso string for start of the Monday in new york time', () => {
      const startOfDay = getStartOfWeek('2022-05-22T23:39:30.000Z', 240);
      expect(startOfDay).toBe('2022-05-16T04:00:00.000Z');
    });

    it('should return iso string for start of the Monday in new york time', () => {
      const startOfDay = getStartOfWeek('2022-05-25T23:39:30.000Z', 240);
      expect(startOfDay).toBe('2022-05-23T04:00:00.000Z');
    });
  });

  describe('getStartOfMonth', () => {
    it('should return iso string for start of the month in melbourne time', () => {
      const startOfDay = getStartOfMonth('2022-04-30T23:39:30.000Z', -600);
      expect(startOfDay).toBe('2022-04-30T14:00:00.000Z');

      const startOfDay1 = getStartOfMonth('2022-05-01T23:39:30.000Z', -600);
      expect(startOfDay1).toBe('2022-04-30T14:00:00.000Z');

      const startOfDay2 = getStartOfMonth('2022-05-03T23:39:30.000Z', -600);
      expect(startOfDay2).toBe('2022-04-30T14:00:00.000Z');

      const startOfDay3 = getStartOfMonth('2022-04-15T23:39:30.000Z', -600);
      expect(startOfDay3).toBe('2022-03-31T14:00:00.000Z');
    });

    it('should return iso string for start of the month in new york time', () => {
      const startOfDay = getStartOfMonth('2022-04-30T23:39:30.000Z', 240);
      expect(startOfDay).toBe('2022-04-01T04:00:00.000Z');

      const startOfDay1 = getStartOfMonth('2022-05-01T23:39:30.000Z', 240);
      expect(startOfDay1).toBe('2022-05-01T04:00:00.000Z');
    });
  });

  describe('isoDateTimeToEpochSeconds', () => {
    it('should return Epoch seconds', () => {
      const simulatedHistoryTimestampStart = isoDateTimeToEpochSeconds(
        '2022-10-03T16:00:00.000Z',
      );
      const simulatedHistoryTimestampEnd = isoDateTimeToEpochSeconds(
        '2022-11-03T16:00:00.000Z',
      );
      const simulatedHistorySpan =
        simulatedHistoryTimestampEnd - simulatedHistoryTimestampStart;

      expect(simulatedHistorySpan).toBe(86400 * 31);
    });
  });
});
