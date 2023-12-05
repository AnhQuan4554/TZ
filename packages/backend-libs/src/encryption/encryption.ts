import crypto from 'crypto';

const secretKey =
  // eslint-disable-next-line no-process-env
  process.env.ENCRYPTION_SECRET_KEY || '';
const algorithm = 'aes-256-cbc';

export class Encryption {
  static randomPassword(length = 12) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('base64');
  }

  static encrypt(text: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encrypted };
  }

  static decrypted(encrypted: string, iv: string, secret?: string) {
    const secretText = secret || secretKey;

    const decipher = crypto.createDecipheriv(
      algorithm,
      secretText,
      Buffer.from(iv, 'hex'),
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  }
}
