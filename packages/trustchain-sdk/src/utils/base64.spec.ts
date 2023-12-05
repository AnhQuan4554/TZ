import { decodeBase64, encodeBase64 } from './base64';

describe('encodeBase64', () => {
  it('should encode string into base64', () => {
    expect(encodeBase64('hello world')).toBe('aGVsbG8gd29ybGQ=');
  });
});

describe('decodeBase64', () => {
  it('should be defined', () => {
    expect(decodeBase64('aGVsbG8gd29ybGQ')).toBe('hello world');
  });
});
