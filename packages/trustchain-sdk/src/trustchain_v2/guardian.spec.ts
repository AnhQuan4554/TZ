import fs from 'fs';
import path from 'path';
import {
  decryptGuardianDocument,
  getPolicyEntityVcsFromTopic,
  getPolicyInfoFromTopic,
  getTokenMintInfo,
  queryTokenMintInfo,
  getTokenMintVpByTimestamp,
  getTokenMintVpByTransactionId,
} from './guardian';
import { getTransaction } from './hedera';

describe.skip('guardian', () => {
  const network = 'testnet';
  const accountId = '0.0.6493';
  const txnRangeStart = '2023-02-01T00:00:00.000Z';
  const txnRangeEnd = '2023-02-20T00:00:00.000Z';
  const messageId = '1675210121.486277003';
  const topicId = '0.0.6527';
  const transactionId = '0.0.6493-1675210114-670574899';
  const demoEncryptionKey = 'NLVYJKWrdMeTTwZP80b9DUYPCiESbsZA';

  jest.setTimeout(50000);

  it('queryTokenMintInfo without stateProof ok', async () => {
    const { tokenMintInfoArray, hasMore } = await queryTokenMintInfo(
      network,
      accountId,
      txnRangeStart,
      txnRangeEnd,
      'asc',
      10,
    );

    expect(tokenMintInfoArray?.length).toEqual(10);
    expect(hasMore).toBeTruthy();
    expect(tokenMintInfoArray[2].accountInfo?.account).toEqual(accountId);
    expect(tokenMintInfoArray[2].tokenClass?.symbol).toEqual('TYM_REC');

    for (let i = 1; i < tokenMintInfoArray.length; i++) {
      expect(
        tokenMintInfoArray[i].transaction?.valid_start_timestamp >=
          tokenMintInfoArray[i - 1].transaction?.valid_start_timestamp,
      ).toBeTruthy();
    }
  });

  it('queryTokenMintInfo with stateProof ok', async () => {
    const { tokenMintInfoArray, hasMore } = await queryTokenMintInfo(
      network,
      accountId,
      txnRangeStart,
      txnRangeEnd,
      'desc',
      10,
      undefined,
      true,
    );

    expect(tokenMintInfoArray?.length).toEqual(10);
    expect(hasMore).toBeTruthy();
    expect(tokenMintInfoArray[2].accountInfo?.account).toEqual(accountId);
    expect(tokenMintInfoArray[2].tokenClass?.symbol).toEqual('TYM_REC');

    for (let i = 1; i < tokenMintInfoArray.length; i++) {
      expect(
        tokenMintInfoArray[i].transaction?.valid_start_timestamp <=
          tokenMintInfoArray[i - 1].transaction?.valid_start_timestamp,
      ).toBeTruthy();
    }
  });

  it('getTokenMintVpByTimestamp ok', async () => {
    const { doc: vp } = await getTokenMintVpByTimestamp(network, messageId);
    expect(vp).toBeDefined();
    expect(vp?.verifiableCredential.length).toBeGreaterThan(0);
    expect(vp?.type[0]).toBe('VerifiablePresentation');
  });

  it('getTokenMintVpByTransactionId ok', async () => {
    const { doc: vp } = await getTokenMintVpByTransactionId(
      network,
      transactionId,
    );
    expect(vp).toBeDefined();
    expect(vp?.verifiableCredential.length).toBeGreaterThan(0);
    expect(vp?.type[0]).toBe('VerifiablePresentation');
  });

  it('getPolicyEntityVcsFromTopic ok', async () => {
    const vcs = await getPolicyEntityVcsFromTopic(network, topicId);

    expect(vcs.length).toBeGreaterThan(0);
    expect(vcs[0].type[0]).toBe('VerifiableCredential');
    expect(vcs[0].credentialSubject.length).toBe(1);
    expect(vcs[0].issuanceDate).toBeDefined();
  });

  it('getPolicyInfoFromTopic ok', async () => {
    const policy = await getPolicyInfoFromTopic(network, topicId);
    expect(policy).toBeDefined();
    expect(policy?.name).toBeDefined();
    expect(policy?.datetime).toBeDefined();
  });

  it('decryptGuardianDocument ok', async () => {
    const encryptedVpDocument = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../../__mocks__/encryptedVp.json'),
        'utf8',
      ),
    );
    const originalVpDocument = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../../__mocks__/decryptedVp.json'),
        'utf8',
      ),
    );
    const result = decryptGuardianDocument(
      encryptedVpDocument,
      demoEncryptionKey,
    );
    expect(decryptGuardianDocument).toBeDefined();
    expect(result).toBeTruthy();
    expect(result).toEqual(originalVpDocument);
  });

  it('getTokenMintInfo  ok', async () => {
    const testingTxn = await getTransaction(network, transactionId);
    const memoTimestamp = testingTxn.memo;

    const transaction = await getTokenMintInfo(network, memoTimestamp);
    expect(transaction).toBeDefined();

    expect(transaction.transaction.memo).toEqual(testingTxn.memo);
    expect(transaction.tokenClass.token_id).toEqual(testingTxn.entity_id);
    expect(transaction.transaction.transaction_id).toEqual(
      testingTxn.transaction_id,
    );
  });
});
