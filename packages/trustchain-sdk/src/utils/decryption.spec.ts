import fs from 'fs';
import path from 'path';
import { decryptBuffer, decryptObject, decryptString } from './decryption';

describe('decryption', () => {
  const demoEncryptionKey = 'NLVYJKWrdMeTTwZP80b9DUYPCiESbsZA';
  it('decryptBuffer ok', async () => {
    const encryptedBuffer = fs.readFileSync(
      path.join(__dirname, '../../__mocks__/encryptedBuffer'),
    );
    const result = JSON.parse(
      decryptBuffer(encryptedBuffer, demoEncryptionKey),
    );
    expect(decryptBuffer).toBeDefined();
    expect(result).toBeTruthy();
    expect(result.id).toEqual('86d499c6-1360-499a-bf2a-a25e1c2a9a9a');
  });
  it('decryptString ok', async () => {
    const encryptedString =
      'number|VFlNTEVaQDEuMC4wWKUKW5jzvvU7vLwontxhiGxfdVQV8Epts9A7TEUSIg5B4hA=';
    const result = decryptString(encryptedString, demoEncryptionKey);
    expect(decryptString).toBeDefined();
    expect(result).toBeTruthy();
    expect(result).toEqual(900);
  });
  it('decryptObject ok', async () => {
    const encryptedObject = {
      doc: {
        __sensitiveFields: ['value', 'co2Emissions', 'encryptStr', 'encyptObj'],
        value:
          'number|VFlNTEVaQDEuMC4wUPw7JXUniRZGPUQqzSPR3Exngc+hE3joqQil5mwiORmIrPk=',
        co2Emissions:
          'number|VFlNTEVaQDEuMC4weI9u/c8l7Y5fSW2MuG6q1X27Jw8GLcnn5d6JAs+bl26Y',
        encryptStr:
          'string|VFlNTEVaQDEuMC4wXq+RZHh+/RUC4REK6kpln4HoL1w2pSTey9Rg/FLg5EZsi49Lpw==',
        encyptObj:
          'object|VFlNTEVaQDEuMC4we3w/k0aRzhUROq4p8au+9UiLekLgclxuLiZzXlzgQKaLmZsilFcFAVj5ahY7',
        date: 'no-encrypted',
      },
    };
    const decryptFunc = (input: string) =>
      decryptString(input, demoEncryptionKey);
    const result = decryptObject(
      encryptedObject,
      '__sensitiveFields',
      decryptFunc,
    );
    expect(decryptObject).toBeDefined();
    expect(result).toBeTruthy();
    expect(result.doc.value).toEqual(900);
    expect(result.doc.co2Emissions).toEqual(1);
    expect(result.doc.encryptStr).toEqual('hello');
    expect(result.doc.encyptObj).toStrictEqual({ test: true });
  });
});
