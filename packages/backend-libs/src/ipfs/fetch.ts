/* eslint-disable no-case-declarations */
import axios, { AxiosResponse } from 'axios';
import { logger } from '../pino';

export const IPFS_GATEWAYS = [
  'ipfs.io',
  'dweb.link',
  'gateway.ipfs.io',
  'testnet.data.tymlez.com',
  //'cloudflare-ipfs.com',
  //'cf-ipfs.com',
];
/**
 * Read IPFS content from the specified CID/URI/URL with fallback to multiple gateway
 * @param cid cid or url or uri of ipfs file
 * @param format output format, json, buffer, or string
 * @param gateway if not specificed, it will fallback to most popular wateway
 * @returns
 */
export async function getIpfsContent<T>(
  cid: string,
  format: 'json' | 'buffer' | 'text',
  gateway?: string,
) {
  const cleanCID = cid
    .replace('ipfs://', '')
    .replace('https://ipfs.io/ipfs/', '');

  const providers = gateway !== undefined ? [gateway] : IPFS_GATEWAYS;
  let res: AxiosResponse;
  const defaultFormat = format || 'json';

  for await (const provider of providers) {
    try {
      const ipfsUrl = `https://${provider}/ipfs/${cleanCID}`;
      switch (defaultFormat) {
        case 'json':
          return (await axios.get<T>(ipfsUrl)).data;

        case 'text':
          res = await axios.get(ipfsUrl, {
            responseType: 'arraybuffer',
          });
          return await res.data.toString();
        case 'buffer':
          res = await axios.get(ipfsUrl, {
            responseType: 'arraybuffer',
          });
          return res.data;
      }
    } catch (err) {
      logger.warn({ err, cid, provider }, 'Unable to fetch ipfs data');
      //swallow the error
    }
  }
  throw new Error(
    `Unable to fetch ipfs data ${cleanCID} from provider = ${providers.join(
      ',',
    )}`,
  );
}
