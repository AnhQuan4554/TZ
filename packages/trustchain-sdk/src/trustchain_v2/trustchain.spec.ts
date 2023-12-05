import { promises as fs } from 'fs';
import { TrustchainV2 } from './trustchain';

describe.skip('Trustchain', () => {
  const trustchain = new TrustchainV2('testnet');
  const accountId = '0.0.6493';
  const messageId = '1677639826.063267003';

  jest.setTimeout(50000);

  it('Trustchain.getAccountInfo ok', async () => {
    const accountInfo = await trustchain.getAccountInfo(accountId);
    expect(accountInfo?.account).toEqual(accountId);
    expect(accountInfo?.balance.balance).toBeGreaterThan(0);
  });

  it('Trustchain.getTokenClasses ok', async () => {
    const tokenClasses = await trustchain.getTokenClasses(accountId);
    expect(tokenClasses?.length).toEqual(4);
    expect(tokenClasses?.map((i) => i.symbol)).toContain('TYM_CRU');
  });

  it('Trustchain.getTokenMintTrustchainByTimestamp ok', async () => {
    const trustchainData = await trustchain.getTokenMintTrustchainByTimestamp(
      messageId,
    );
    await fs.writeFile(`test.json`, JSON.stringify(trustchainData, null, 2));
    expect(trustchainData?.policyInfo).toBeDefined();
    expect(trustchainData?.site).toBeDefined();
    expect(trustchainData?.devices.length).toBeDefined();
    expect(trustchainData?.installers.length).toBeDefined();
    expect(trustchainData?.vpInfo?.cid).toBeDefined();
    expect(trustchainData?.vpInfo?.md5).toBeDefined();
  });

  it('Trustchain.queryTokenMints ok', async () => {
    const tokenMintData = await trustchain.queryTokenMints({
      hederaAccountId: accountId,
      startDatetime: '2023-02-01T00:00:00.000Z',
      endDatetime: '2023-02-20T00:00:00.000Z',
      order: 'asc',
      maxNumTokens: 2,
      tokenClassIds: undefined,
      includeStateProof: false,
    });
    const { tokenMintInfoArray, hasMore } = tokenMintData;
    expect(hasMore).toBeTruthy();
    expect(tokenMintInfoArray?.length).toBe(2);
  });
});
