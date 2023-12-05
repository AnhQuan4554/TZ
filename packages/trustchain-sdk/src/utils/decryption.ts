import crypto from 'crypto';
import { isNumeric } from '@tymlez/common-libs';

export function decryptBuffer(encrypted: Buffer, decryptionKey: string) {
  const algorithm: crypto.CipherGCMTypes = 'aes-256-gcm';
  const iv = encrypted.slice(12, 28);

  const authTag = encrypted.slice(28, 44); // 16 bytes authTag

  const encryptedContent = encrypted.slice(44);
  const decipher = crypto.createDecipheriv(algorithm, decryptionKey, iv);

  decipher.setAuthTag(authTag);

  const result = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ]);
  return result.toString();
}

export function decryptString(input: string, decryptionKey: string): any {
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

export function decryptObject(
  obj: any,
  controlledField: string,
  decryptFunc: (input: string) => string,
): any {
  if (
    typeof obj === 'string' ||
    isNumeric(obj) ||
    obj === undefined ||
    obj === null
  ) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((element: any) =>
      decryptObject(element, controlledField, decryptFunc),
    );
  }
  if (obj && typeof obj === 'object') {
    const nestedInput = { ...obj };
    const fieldNamesToDecrypt = obj[controlledField] || [];

    for (const prop of Object.keys(obj)) {
      if (fieldNamesToDecrypt.includes(prop) && typeof obj[prop] === 'string') {
        nestedInput[prop] = decryptFunc(obj[prop]);
      } else if (prop !== controlledField) {
        if (Array.isArray(nestedInput[prop])) {
          nestedInput[prop] = nestedInput[prop].map((x: any) =>
            decryptObject(x, controlledField, decryptFunc),
          );
        } else {
          nestedInput[prop] = decryptObject(
            nestedInput[prop],
            controlledField,
            decryptFunc,
          );
        }
      }
    }
    return nestedInput;
  }
}
