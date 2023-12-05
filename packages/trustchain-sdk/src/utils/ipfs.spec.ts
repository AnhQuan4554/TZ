import { safeJsonParse } from '@tymlez/common-libs';
import { getIpfsFileContentBuffer } from './ipfs';

describe('Ipfs', () => {
  jest.setTimeout(5000);
  const cid = 'bafkreigjcwixy4dgdsvzdlr3y2crjjjch7tqovynmxq2eggv2vwgwbeshy';

  it('getIpfsFileContentBuffer ok', async () => {
    const fileContent = await getIpfsFileContentBuffer('testnet', cid);

    expect(fileContent).toBeDefined();
    const content = safeJsonParse(fileContent.toString(), undefined);

    expect(content['@context']['@version']).toBe(1.1);
  });

  it('getIpfsFileContentBuffer throw error', async () => {
    expect.assertions(1);

    await getIpfsFileContentBuffer('testnet', 'foo').catch((e) => {
      expect(e).toBeDefined();
    });
  });
});
