import { msecToTime } from './msecToTime';

describe('msecToTime', () => {
  it.each`
    ms           | output
    ${100}       | ${'00:00:00.100'}
    ${9923}      | ${'00:00:09.923'}
    ${23904}     | ${'00:00:23.904'}
    ${63304}     | ${'00:01:03.304'}
    ${763304}    | ${'00:12:43.304'}
    ${66786543}  | ${'18:33:06.543'}
    ${undefined} | ${'00:00:00.0'}
  `('msecToTime($ms) should return "$output"', ({ ms, output }) => {
    expect(msecToTime(ms)).toEqual(output);
  });
});
