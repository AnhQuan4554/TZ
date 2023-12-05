export const encodeBase64 = (str: string) => {
  return Buffer.from(str, 'utf-8').toString('base64');
};
export const decodeBase64 = (base64str: string) => {
  return Buffer.from(base64str, 'base64').toString('utf8');
};
