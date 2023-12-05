// This file is deprecated
/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { isNumeric } from '@tymlez/common-libs';

export function decryptBuffer(encrypted: Buffer, decryptionKey: string) {
  const algorithm: crypto.CipherGCMTypes = 'aes-256-gcm';
  const iv = encrypted.slice(12, 28);

  const authTag = encrypted.slice(28, 44); // 16 bytes authTag

  if (!decryptionKey) {
    throw new BadRequestException('Missing IPFS_DECRYPTION_KEY');
  }

  const encryptedContent = encrypted.slice(44);
  const decipher = crypto.createDecipheriv(algorithm, decryptionKey, iv);

  decipher.setAuthTag(authTag);

  const result = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ]);
  return result.toString();
}

function decryptString(input: string, decryptionKey: string): any {
  const typeDelimiter = '|';
  const [type, data] = input.split(typeDelimiter);

  const output = decryptBuffer(Buffer.from(data, 'base64'), decryptionKey);
  if (type === 'number') {
    return Number(output.toString());
  }

  if (type === 'object') {
    return JSON.parse(output.toString());
  }
  return output.toString();
}

/**
 * Loop through the json object and decrypt field specified in __sensitiveFields
 * @param input
 * @param controlledField
 * @returns
 */
export function decryptJsonObject(
  input: any,
  decryptionKey: string,
  controlledField = '__sensitiveFields',
) {
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
      nestedInput[field] = decryptString(input[field], decryptionKey);
    } else if (field !== controlledField) {
      if (Array.isArray(nestedInput[field])) {
        nestedInput[field] = nestedInput[field].map((x: any) =>
          decryptJsonObject(x, decryptionKey, controlledField),
        );
      } else {
        nestedInput[field] = decryptJsonObject(
          nestedInput[field],
          decryptionKey,
          controlledField,
        );
      }
    }
  }
  return nestedInput;
}
