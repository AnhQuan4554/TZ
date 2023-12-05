import { parseGPSLocationString } from './geolocation';

describe('geolocation ', () => {
  it('should convert a Guardian gps location string into lat and long', () => {
    const testCases = {
      '153.3864630515758--27.962306855423336': {
        long: '153.3864630515758',
        lat: '-27.962306855423336',
      },
      '-153.3864630515758--27.962306855423336': {
        long: '-153.3864630515758',
        lat: '-27.962306855423336',
      },
      '-153.3864630515758-27.962306855423336': {
        long: '-153.3864630515758',
        lat: '27.962306855423336',
      },
      '153.3864630515758-27.962306855423336': {
        long: '153.3864630515758',
        lat: '27.962306855423336',
      },
    };

    Object.entries(testCases).forEach(([geolocation, expected]) => {
      const testcase = parseGPSLocationString(geolocation);
      expect(testcase.lat).toBe(expected.lat);
      expect(testcase.long).toBe(expected.long);
    });
  });
});
