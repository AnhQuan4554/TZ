import {
  getAccountInfo,
  getChunkedMessages,
  getDecodedMessageByConsensusTimestamp,
  getMessageByTopicIdAndSequenceNumber,
  getMessagesByTopicIdAndSequenceRange,
  getTokenClassDetail,
  getTokenClasses,
  getTransaction,
  getTransactions,
  getTransactionStateProof,
  getHederaDocumentByConsensusTimestamp,
  getTokenNFTInfoArray,
  getTokenNFTInfoByTimestamp,
  getAllTokenNFTInfoArray,
} from './hedera';
import type { IHederaTransactionRequest } from './interfaces';

describe.skip('hedera', () => {
  const accountId = '0.0.6493';
  const network = 'testnet';
  const cetTokenClassId = '0.0.6495';
  const gooTokenClassId = '0.0.6701';
  const txnRangeStart = '2023-02-01T00:00:00.000Z';
  const txnRangeEnd = '2023-02-20T00:00:00.000Z';
  const testTopic = '0.0.6628';
  const testTopicSeqNum = 597;
  const txnId = '0.0.3423923-1676542292-332314253';

  jest.setTimeout(50000);

  it('getAccountInfo ok', async () => {
    const accountInfo = await getAccountInfo(network, accountId);
    expect(accountInfo?.account).toEqual(accountId);
    expect(accountInfo?.balance.balance).toBeGreaterThan(0);
  });

  it('getTokenClasses ok', async () => {
    const tokenClasses = await getTokenClasses(network, accountId);
    expect(tokenClasses?.length).toEqual(4);
    expect(tokenClasses.map((i) => i.symbol)).toContain('TYM_CRU');
  });

  it('getTokenClassDetail ok', async () => {
    const tokenClasseDetail = await getTokenClassDetail(
      network,
      cetTokenClassId,
    );
    expect(tokenClasseDetail?.treasury_account_id).toEqual(accountId);
    expect(tokenClasseDetail.symbol).toEqual('TYM_CET');
  });

  it('getTransaction ok', async () => {
    const txn = await getTransaction(network, txnId);

    expect(txn).toBeDefined();
    expect(txn.name).toBe('TOKENMINT');
    expect(txn.memo).toBe('1676542302.207666003');
  });

  it('getTransactions without filter ok', async () => {
    const txnRequest = {
      network,
      accountId,
      startTimestamp: txnRangeStart,
      endTimestamp: txnRangeEnd,
      maxNumTxns: 5,
      order: 'asc',
      startTimestampInclusive: false,
      endTimestampInclusive: true,
      timestampFormat: 'iso',
    };
    const { transactions, hasMore } = await getTransactions(txnRequest);

    expect(transactions.length).toEqual(5);
    expect(hasMore).toEqual(true);
    expect(
      transactions[0].consensus_timestamp < transactions[1].consensus_timestamp,
    ).toBeTruthy();
  });

  it('getTransactions with filter ok', async () => {
    const transactionRequeset: IHederaTransactionRequest = {
      network,
      accountId,
      startTimestamp: txnRangeStart,
      endTimestamp: txnRangeEnd,
      maxNumTxns: 5,
      order: 'desc',
      startTimestampInclusive: false,
      endTimestampInclusive: true,
      timestampFormat: 'iso',
      transactionFilter: (txn) => txn.name === 'CRYPTOTRANSFER',
    };
    const { transactions, hasMore } = await getTransactions(
      transactionRequeset,
    );

    expect(transactions.length).toEqual(5);
    expect(hasMore).toEqual(true);
    expect(
      transactions[0].consensus_timestamp > transactions[1].consensus_timestamp,
    ).toBeTruthy();
    expect(
      transactions.filter((i) => i.name === 'CRYPTOTRANSFER').length,
    ).toEqual(5);
  });

  it('getTransactionStateProof ok', async () => {
    const transactionRequeset: IHederaTransactionRequest = {
      network,
      accountId,
      startTimestamp: txnRangeStart,
      endTimestamp: txnRangeEnd,
      maxNumTxns: 1,
      order: 'desc',
      startTimestampInclusive: false,
      endTimestampInclusive: true,
      timestampFormat: 'iso',
      transactionFilter: (txn) => txn.name === 'CRYPTOTRANSFER',
    };
    const { transactions } = await getTransactions(transactionRequeset);

    expect(transactions.length).toEqual(1);

    const transactionId = transactions[0].transaction_id;

    const stateProof = await getTransactionStateProof(network, transactionId);

    expect(stateProof?.record_file).toBeDefined();
  });

  it('getMessageByTopicIdAndSequenceNumber ok', async () => {
    const message = await getMessageByTopicIdAndSequenceNumber(
      network,
      testTopic,
      testTopicSeqNum,
    );

    expect(message.chunk_info.number).toEqual(1);
    expect(message.chunk_info.total).toEqual(14);
    expect(message.topic_id).toEqual(testTopic);
    expect(message.sequence_number).toEqual(testTopicSeqNum);
  });

  it('getMessagesByTopicIdAndSequenceRange ok', async () => {
    const messages = await getMessagesByTopicIdAndSequenceRange(
      network,
      testTopic,
      testTopicSeqNum,
      3,
    );
    expect(messages.length).toEqual(3);

    expect(messages[0].chunk_info.number).toEqual(1);
    expect(messages[0].chunk_info.total).toEqual(14);
    expect(messages[0].topic_id).toEqual(testTopic);
    expect(messages[0].sequence_number).toEqual(testTopicSeqNum);
    expect(messages[1].sequence_number).toEqual(testTopicSeqNum + 1);
  });

  it('getChunkedMessages ok', async () => {
    const message = await getMessageByTopicIdAndSequenceNumber(
      network,
      testTopic,
      testTopicSeqNum,
    );

    const messages = await getChunkedMessages(
      network,
      testTopic,
      message.sequence_number,
      message.chunk_info.total,
      message.chunk_info.initial_transaction_id.transaction_valid_start,
    );
    expect(messages.length).toEqual(message.chunk_info.total);

    messages.forEach((msg) => {
      expect(msg.topic_id).toEqual(testTopic);
      expect(
        msg.chunk_info.initial_transaction_id.transaction_valid_start,
      ).toEqual(
        message.chunk_info.initial_transaction_id.transaction_valid_start,
      );
    });
  });

  it('getDecodedMessageByConsensusTimestamp ok', async () => {
    const msg = await getMessageByTopicIdAndSequenceNumber(
      network,
      testTopic,
      testTopicSeqNum + 4, // so that it is not the first seqNum
    );
    const timestamp = msg.consensus_timestamp;

    const decodedResult = await getDecodedMessageByConsensusTimestamp(
      network,
      timestamp,
    );

    const { message, decodedMessageContent } = decodedResult;

    expect(message.topic_id).toEqual(testTopic);
    expect(message.sequence_number).toEqual(testTopicSeqNum + 4);
    expect(decodedMessageContent).toBeDefined();
    expect(decodedMessageContent?.type).toEqual('VP-Document');
    expect(decodedMessageContent?.relationships?.length).toBeGreaterThan(0);
    expect(decodedMessageContent?.cid.length).toBeGreaterThan(0);
    expect(decodedMessageContent?.uri.length).toBeGreaterThan(0);
  });

  it('getHederaDocumentByConsensusTimestamp ok', async () => {
    const msg = await getMessageByTopicIdAndSequenceNumber(
      network,
      testTopic,
      testTopicSeqNum + 4, // so that it is not the first seqNum
    );
    const timestamp = msg.consensus_timestamp;

    const { cid, doc } = await getHederaDocumentByConsensusTimestamp(
      network,
      timestamp,
    );

    expect(cid).toBeDefined();
    expect(doc).toBeDefined();
    expect(doc?.verifiableCredential.length).toBeGreaterThan(0);
    expect(doc?.type).toStrictEqual(['VerifiablePresentation']);
  });

  it('getHederaDocumentByConsensusTimestamp ok', async () => {
    const msg = await getMessageByTopicIdAndSequenceNumber(
      network,
      testTopic,
      testTopicSeqNum + 4, // so that it is not the first seqNum
    );
    const timestamp = msg.consensus_timestamp;

    const { cid, doc } = await getHederaDocumentByConsensusTimestamp(
      network,
      timestamp,
    );

    expect(cid).toBeDefined();
    expect(doc).toBeDefined();
    expect(doc?.verifiableCredential.length).toBeGreaterThan(0);
    expect(doc?.type).toStrictEqual(['VerifiablePresentation']);
  });

  it('getTokenNFTInfoArray ok', async () => {
    const nfts = await getTokenNFTInfoArray(network, gooTokenClassId);

    expect(nfts).toHaveLength(100);
  });

  it('getTokenNFTInfoByTimestamp ok', async () => {
    const nft = await getTokenNFTInfoByTimestamp(
      network,
      gooTokenClassId,
      '1678529269.005020003',
    );
    console.log(nft);
    expect(nft).toBeDefined();
    expect(nft?.serial_number).toBe(1638);
  });

  it.skip('getAllTokenNFTInfoArray ok', async () => {
    const nft = await getAllTokenNFTInfoArray(network, gooTokenClassId);

    expect(nft).toBeDefined();
    expect(nft?.length).toBeGreaterThan(1638);
  });
});
