import { mapValuesRecursively } from './object';

describe('mapValuesRecursively', () => {
  it('should map Values Recursively', () => {
    const testCases = { a: 1, b: 'foo', c: { d: 2, e: 'bar' } };

    const func = (input: any) => {
      if (!isNaN(input)) {
        return input + 1;
      }
      return input;
    };

    const result = mapValuesRecursively(testCases, func);

    expect(result.a).toBe(2);
    expect(result.c.d).toBe(3);
    expect(result.b).toBe('foo');
    expect(result.c.e).toBe('bar');
  });
});
