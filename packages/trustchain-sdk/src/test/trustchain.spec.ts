import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { Trustchain } from '../trustchain';

describe.skip('Trustchain', () => {
  let trustchain: Trustchain;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Trustchain,
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            setContext: jest.fn(),
          },
        },
      ],
    }).compile();
    trustchain = module.get<Trustchain>(Trustchain);
  });
  jest.setTimeout(50000);
  it('should be defined', () => {
    expect(trustchain).toBeDefined();
  });
  it('retrieval of tokens using accountId: 0.0.6541 and timestamp', async () => {
    const result = await trustchain
      .getTokensUsingAccountId(
        '0.0.6541',
        '2022-01-01 00:00:00',
        '2023-02-22 23:59:59',
        {
          transactionType: 'TOKENMINT',
          populateRelationships: false,
          tymlezCdn: true,
        },
        50,
      )
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
    expect(result?.transactions?.length).toEqual(50);
  });
  it('retrieval of tokens using accountId: 0.0.6603 and timestamp with pagination', async () => {
    const result = await trustchain
      .getTokensUsingAccountIdWithPagination(
        '0.0.6603',
        '2023-02-06T00:00:00.000Z',
        '2023-02-07T00:00:00.000Z',
        {
          transactionType: 'TOKENMINT',
          populateRelationships: false,
          tymlezCdn: true,
        },
        'asc',
      )
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
  });
  it('retrieval of transaction using transactionId: 0.0.6603-1675123407-119801690', async () => {
    const result = await trustchain
      .getTrustChainUsingTransactionId('0.0.6603-1675123407-119801690', {
        populateRelationships: false,
        tymlezCdn: true,
      })
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
    expect(result?.transactions?.length).toEqual(1);
  });
  it('retrieval of transaction using transactionId: 0.0.6603-1675123407-119801690 and groupBy: deviceId', async () => {
    const result = await trustchain
      .getTrustChainUsingTransactionIdWithGrouping(
        '0.0.6603-1675123407-119801690',
        { populateRelationships: false, tymlezCdn: true },
        'deviceId',
      )
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
    expect(result?.transactions?.length).toEqual(1);
  });
  it('retrieval of NFT transaction using tokenId: 0.0.6605 and accountId: 0.0.6603', async () => {
    const result = await trustchain
      .getNftTrustChain('0.0.6606', '0.0.6603', {
        populateRelationships: false,
        tymlezCdn: true,
      })
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
    expect(result?.token?.token_id).toEqual('0.0.6606');
    expect(result?.token?.treasury_account_id).toEqual('0.0.6603');
  });
  it('retrieval of Topic messages using topicId: 0.0.6628', async () => {
    const result = await trustchain
      .getTopicTrustChain('0.0.6628', {
        populateRelationships: false,
        tymlezCdn: true,
      })
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
    expect(result?.transactions?.length).toBeGreaterThan(0);
  });
  it('retrieval of device certification document using ipfsUrl: https://ipfs.io/ipfs/bafkreifxvoivmur2vo7zya7mvwiburlxsosnkwsi4agkpn3z546fozg6zq', async () => {
    const result = await trustchain
      .getDeviceCertificationDocument(
        'https://ipfs.io/ipfs/bafkreifxvoivmur2vo7zya7mvwiburlxsosnkwsi4agkpn3z546fozg6zq',
        { populateRelationships: false, tymlezCdn: false },
      )
      .then((response) => {
        return response;
      });
    expect(result).toBeTruthy();
  });
});
