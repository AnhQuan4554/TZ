import { Injectable } from '@nestjs/common';

import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { METRIC_NAMES, reportAPMMetric } from '@tymlez/backend-libs';
import { isNumeric } from '@tymlez/common-libs';

/**
 * IPFS service tho listen and encrypt content from guardian via service broker
 */
@Injectable()
export class IpfsService {
  private encryptionVersion = Buffer.from('TYMLEZ@1.0.0');
  private algorithm: crypto.CipherGCMTypes = 'aes-256-gcm';
  private typeDelimiter = '|';
  private sensitiveFieldName = '__sensitiveFields';

  constructor(
    private readonly logger: PinoLogger,
    private configService: ConfigService,
  ) {
    this.logger.setContext(IpfsService.name);
  }

  handleIPFSAddedEvent(payload: any): void {
    this.logger.info({ payload }, 'IPFS file added');
  }

  public isEncryptedBuffer(buffer: Buffer) {
    const version = buffer.slice(0, 12);
    return version.toString().includes('TYMLEZ@');
  }

  public isEncryptedString(input: string) {
    if (typeof input !== 'string') {
      return false;
    }

    if (input.includes(this.typeDelimiter)) {
      return this.isEncryptedBuffer(
        Buffer.from(input.split(this.typeDelimiter)[1], 'base64'),
      );
    }
    return this.isEncryptedBuffer(Buffer.from(input, 'base64'));
  }

  public shouldEncrypt(input: Buffer) {
    try {
      const strContent = input.toString();
      const json = JSON.parse(strContent);

      if (json && json.type && Array.isArray(json.type)) {
        if (
          json.type.includes('VerifiableCredential') ||
          json.type.includes('VerifiablePresentation')
        ) {
          if (strContent.includes('__sensitiveFields')) {
            return json;
          }
          return false;
        }
      }
      return false;
    } catch (e) {
      // If content is not json, skip encryption
    }
    return false;
  }

  /**
   * Encryp the input string and return base64 string of encrypted bytes or the buffer of encrypted content
   * @param input input string
   * @returns
   */
  public encrypt(input: Buffer, returnAsBuffer = false): string | Buffer {
    const encryptionKey = this.configService.get<string>('IPFS_ENCRYPTION_KEY');
    const iv = crypto.randomBytes(16);
    if (!encryptionKey) {
      throw new Error('Missing IPFS_ENCRYPTION_KEY in environment var');
    }
    const cipher = crypto.createCipheriv(this.algorithm, encryptionKey, iv);
    const buffer = Buffer.from(input);
    const encryptedBuffer = Buffer.concat([
      cipher.update(buffer),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    const result = Buffer.concat([
      this.encryptionVersion,
      iv,
      authTag,
      encryptedBuffer,
    ]);
    return returnAsBuffer ? result : result.toString('base64');
  }

  private encryptField(fieldValue: any): string {
    const dataType = typeof fieldValue;
    const value =
      dataType === 'object'
        ? JSON.stringify(fieldValue)
        : fieldValue.toString();
    return `${dataType}|${this.encrypt(Buffer.from(value), false)}`;
  }

  private decryptString(input: string): any {
    const [type, data] = input.split(this.typeDelimiter);

    const output = this.decryptBuffer(Buffer.from(data, 'base64'));
    if (type === 'number') {
      return Number(output.toString());
    }

    if (type === 'object') {
      return JSON.parse(output.toString());
    }
    return output.toString();
  }

  /**
   * Loop thought all the json object and encrypt field specific in __sensitiveFields
   * @param input
   * @param controlledField
   * @returns
   */
  public encryptJsonObject(input: any, controlledField = '__sensitiveFields') {
    if (
      typeof input === 'string' ||
      isNumeric(input) ||
      input === undefined ||
      input === null
    ) {
      return input;
    }
    const nestedInput = { ...input };
    const fields = input[controlledField] || [];

    for (const field of Object.keys(input)) {
      if (fields.includes(field)) {
        nestedInput[field] = this.encryptField(input[field]);
      } else if (field !== controlledField) {
        if (Array.isArray(nestedInput[field])) {
          nestedInput[field] = nestedInput[field].map((x: any) =>
            this.encryptJsonObject(x, controlledField),
          );
        } else {
          nestedInput[field] = this.encryptJsonObject(
            nestedInput[field],
            controlledField,
          );
        }
      }
    }
    return nestedInput;
  }

  /**
   * Loop thought all the json object and decrypt field specific in __sensitiveFields
   * @param input
   * @param controlledField
   * @returns
   */
  public descryptJsonObject(input: any, controlledField = '__sensitiveFields') {
    if (
      typeof input === 'string' ||
      isNumeric(input) ||
      input === undefined ||
      input === null
    ) {
      return input;
    }
    const nestedInput = { ...input };
    const fields = input[controlledField] || [];

    for (const field of Object.keys(input)) {
      if (fields.includes(field) && typeof input[field] === 'string') {
        nestedInput[field] = this.decryptString(input[field]);
      } else if (field !== controlledField) {
        if (Array.isArray(nestedInput[field])) {
          nestedInput[field] = nestedInput[field].map((x: any) =>
            this.descryptJsonObject(x, controlledField),
          );
        } else {
          nestedInput[field] = this.descryptJsonObject(
            nestedInput[field],
            controlledField,
          );
        }
      }
    }
    return nestedInput;
  }

  public encryptBuffer(buffer: Buffer) {
    const shouldEncrypted = this.shouldEncrypt(buffer);
    if (!shouldEncrypted) {
      this.logger.warn('The content does not need to be encrypted');
      return buffer;
    }

    if (typeof shouldEncrypted === 'object') {
      const json = this.encryptJsonObject(shouldEncrypted);
      this.logger.info('Successful encrypt json content');
      reportAPMMetric(METRIC_NAMES.IPFS_FILE_ENCRYPTED, 1);
      return Buffer.from(JSON.stringify(json));
    }

    this.logger.info('Successful encrypt file content');
    reportAPMMetric(METRIC_NAMES.IPFS_FILE_ENCRYPTED, 1);
    return this.encrypt(buffer, true) as Buffer;
  }

  decryptBuffer(encrypted: Buffer) {
    const decryptBufferContent = (inputBuffer: Buffer) => {
      const version = inputBuffer.slice(0, 12);
      const iv = inputBuffer.slice(12, 28);
      this.logger.info(
        { version },
        `Content was encrypted with version : ${version}`,
      );
      const authTag = inputBuffer.slice(28, 44); // 16 bytes authTag
      const encryptionKey = this.configService.get<string>(
        'IPFS_ENCRYPTION_KEY',
      );

      if (!encryptionKey) {
        throw new Error('Missing IPFS_ENCRYPTION_KEY in environment variables');
      }

      const encryptedContent = inputBuffer.slice(44);

      const decipher = crypto.createDecipheriv(
        this.algorithm,
        encryptionKey,
        iv,
      );

      decipher.setAuthTag(authTag);

      const result = Buffer.concat([
        decipher.update(encryptedContent),
        decipher.final(),
      ]);
      return result;
    };

    try {
      const stringContent = encrypted.toString();
      if (stringContent.includes(this.sensitiveFieldName)) {
        const json = JSON.parse(stringContent);
        this.logger.info('descypt using field decryption');
        return this.descryptJsonObject(json);
      }
    } catch (err) {
      //swallow
    }
    return decryptBufferContent(encrypted);
  }
}
