import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import fs from 'fs';
import path from 'path';
import { IpfsService } from './ipfs.service';

describe('IpfsService', () => {
  let service: IpfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IpfsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'IPFS_ENCRYPTION_KEY') {
                return 'NLVYJKWrdMeTTwZP80b9DUYPCiESbsZA';
              }
              return null;
            }),
          },
        },
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            setContext: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IpfsService>(IpfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptedJsonObject test', () => {
    it('should encrypt all fields in __sensitiveFields and ignore null or underfined', () => {
      const input = {
        doc: {
          __sensitiveFields: ['value', 'co2Emissions'],
          value: 900,
          co2Emissions: 1,
          nulFIeld: null,
          undefinedField: undefined,
          date: 'no-encrypted',
        },
      };

      const output = service.encryptJsonObject(input);
      expect(output.doc.date).toEqual(input.doc.date);
      expect(service.isEncryptedString(output.doc.value)).toBeTruthy();
      expect(service.isEncryptedString(output.doc.co2Emissions)).toBeTruthy();
    });

    it('should encrypt all fields in __sensitiveFields in array', () => {
      const input = {
        documents: [
          {
            __sensitiveFields: ['value', 'co2Emissions'],
            value: 900,
            co2Emissions: 1,
            date: 'no-encrypted',
          },
          {
            __sensitiveFields: ['value', 'co2Emissions'],
            value: 1000,
            co2Emissions: 1,
            date: 'no-encrypted',
          },
        ],
      };

      const output = service.encryptJsonObject(input);
      expect(output.documents[0].date).toEqual(input.documents[0].date);
      expect(service.isEncryptedString(output.documents[0].value)).toBeTruthy();
      expect(
        service.isEncryptedString(output.documents[0].co2Emissions),
      ).toBeTruthy();

      expect(service.isEncryptedString(output.documents[1].value)).toBeTruthy();
      expect(
        service.isEncryptedString(output.documents[1].co2Emissions),
      ).toBeTruthy();
    });

    it('should encrypt all fields in __sensitiveFields in level 2', () => {
      const input = {
        __sensitiveFields: ['value', 'co2Emissions'],
        value: 900,
        co2Emissions: 1,
        date: 'no-encrypted',
      };

      const output = service.encryptJsonObject(input);

      expect(output.date).toEqual(input.date);
      expect(service.isEncryptedString(output.value)).toBeTruthy();
      expect(service.isEncryptedString(output.co2Emissions)).toBeTruthy();
    });

    it('should encrypt all fields in __sensitiveFields nested level 2', () => {
      const input = {
        doc: {
          __sensitiveFields: ['value', 'co2Emissions'],
          value: 900,
          co2Emissions: 1,
          date: 'no-encrypted',
        },
      };

      const output = service.encryptJsonObject(input);
      expect(output.doc.date).toEqual(input.doc.date);
      expect(service.isEncryptedString(output.doc.value)).toBeTruthy();
      expect(service.isEncryptedString(output.doc.co2Emissions)).toBeTruthy();
    });

    it('should encrypt all fields in __sensitiveFields nested level 3', () => {
      const input = {
        doc: {
          __sensitiveFields: ['value', 'co2Emissions'],
          value: 900,
          co2Emissions: 1,
          date: 'no-encrypted',
          doc1: {
            __sensitiveFields: ['value', 'co2Emissions'],
            value: 900,
            co2Emissions: 1,
            date: 'no-encrypted',
          },
        },
      };

      const output = service.encryptJsonObject(input);
      expect(output.doc.date).toEqual(output.doc.doc1.date);
      expect(service.isEncryptedString(output.doc.doc1.value)).toBeTruthy();
      expect(
        service.isEncryptedString(output.doc.doc1.co2Emissions),
      ).toBeTruthy();
    });
  });

  describe('decryptJsonObject test', () => {
    it('should decypt all file  all fields in __sensitiveFields and ignore null or underfined', () => {
      const input = {
        doc: {
          __sensitiveFields: [
            'value',
            'co2Emissions',
            'encryptStr',
            'encyptObj',
          ],
          value: 900,
          co2Emissions: 1,
          encryptStr: 'hello',
          encyptObj: { test: true },
          date: 'no-encrypted',
        },
      };

      const output = service.encryptJsonObject(input);
      expect(input).not.toEqual(output);
      expect(service.isEncryptedString(output.doc.value)).toBeTruthy();

      const decrypted = service.descryptJsonObject(output);

      expect(decrypted.doc).toEqual(input.doc);
    });
  });

  describe('VP document', () => {
    it('should encrypt all vc document respect field encryption setting', () => {
      const vp = JSON.parse(
        fs.readFileSync(path.join(__dirname, './__mocks__/vp.json'), 'utf8'),
      );
      vp.verifiableCredential.forEach((el: any) => {
        el.credentialSubject.forEach((cs: any) => {
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          cs.__sensitiveFields = ['value', 'CO2Emissions'];
        });
      });

      const encrypted = service.encryptBuffer(Buffer.from(JSON.stringify(vp)));
      const obj = JSON.parse(encrypted.toString());
      expect(obj.type).toEqual(['VerifiablePresentation']);

      expect(
        service.isEncryptedString(
          obj.verifiableCredential[0].credentialSubject[0].value,
        ),
      ).toBeTruthy();

      expect(
        service.isEncryptedString(
          obj.verifiableCredential[0].credentialSubject[0].CO2Emissions,
        ),
      ).toBeTruthy();
    });

    it('should successful descript json with encrypted fields', () => {
      const vp = JSON.parse(
        fs.readFileSync(path.join(__dirname, './__mocks__/vp.json'), 'utf8'),
      );

      vp.verifiableCredential.forEach((el: any) => {
        el.credentialSubject.forEach((cs: any) => {
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          cs.__sensitiveFields = ['value', 'CO2Emissions'];
        });
      });

      const encrypted = service.encryptBuffer(Buffer.from(JSON.stringify(vp)));

      const vpDecrypted = service.decryptBuffer(encrypted);
      expect(vpDecrypted).toEqual(vp);
    });
  });

  describe('VC document', () => {
    it('should encrypt all vc document respect field encryption setting', () => {
      const vp = JSON.parse(
        fs.readFileSync(path.join(__dirname, './__mocks__/vc.json'), 'utf8'),
      );
      const encrypted = service.encryptBuffer(Buffer.from(JSON.stringify(vp)));
      const obj = JSON.parse(encrypted.toString());
      expect(obj.type).toEqual(['VerifiableCredential']);

      expect(
        service.isEncryptedString(obj.credentialSubject[0].serialNumber),
      ).toBeTruthy();
    });
  });
});
