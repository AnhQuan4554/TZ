import { mergeAndSortSeriesData } from './series';

describe('mergeAndSortSeriesData', () => {
  it('should merge and sort series data', () => {
    const testcase = [
      {
        isoDateTime: '2022-09-07T23:00:00.000Z',
        value: 1081.4222,
      },
      {
        isoDateTime: '2022-08-09T00:00:00.000Z',
        value: 1434.882,
      },
      {
        isoDateTime: '2022-08-07T01:00:00.000Z',
        value: 1437.073,
      },
      {
        isoDateTime: '2022-08-08T01:00:00.000Z',
        value: 722.7131,
      },
      {
        isoDateTime: '2022-08-08T07:00:00.000Z',
        value: 151.3165,
      },
      {
        isoDateTime: '2022-08-08T08:00:00.000Z',
        value: 34.8279,
      },
      {
        isoDateTime: '2022-08-08T08:00:00.000Z',
        value: 446.5548,
      },
      {
        isoDateTime: '2022-08-08T09:00:00.000Z',
        value: 67.7615,
      },
    ];
    const expected = [
      { isoDateTime: '2022-09-07T23:00:00.000Z', value: 1081.4222 },
      { isoDateTime: '2022-08-09T00:00:00.000Z', value: 1434.882 },
      { isoDateTime: '2022-08-07T01:00:00.000Z', value: 1437.073 },
      { isoDateTime: '2022-08-08T01:00:00.000Z', value: 722.7131 },
      { isoDateTime: '2022-08-08T07:00:00.000Z', value: 151.3165 },
      { isoDateTime: '2022-08-08T08:00:00.000Z', value: 481.3827 },
      { isoDateTime: '2022-08-08T09:00:00.000Z', value: 67.7615 },
    ];
    expect(JSON.stringify(mergeAndSortSeriesData(testcase))).toBe(
      JSON.stringify(expected),
    );
  });
});
