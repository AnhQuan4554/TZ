// const settingBlueIcon = '../images/setting_blue.svg';
// const settingGrayIcon = '../images/setting_gray.svg';
// const oClockGreenIcon = '../images/oclock_green.svg';
// const oClockGrayIcon = '../images/oclock_gray.svg';
// const repeatDatabaseIcon = '../images/repeat_database.svg';
// const repeatDatabaseGrayIcon = '../images/repeat_database_gray.svg';
// const totalTokenIcon = '../images/total_token.svg';

export const tokenDetailsDataSample = {
  success: true,
  data: {
    name: 'TOKENMINT',
    entityId: '0.0.48461802',
    memo: '1668421037.450554871',
    consensusTimestamp: '1668421040.620389003',
    transactionHash:
      'QKDOFPA3Fw505BCvH6AGGFl+X4iKAOufq/qTNLiHLh3wJTMnphJJFv0jenJzhUto',
    transactionId: '0.0.48461796-1668421030-895669396',
    rootAuthority: '0.0.48461796',
    adminKey: {
      _type: 'ED25519',
      key: 'ac97da8b7f4cb2106c39aa315b067f0d2f70b9fea607ba029e9f3649bb9676f8',
    },
    symbol: 'TYM_GOO',
    tokenId: '0.0.48461802',
    type: 'FUNGIBLE_COMMON',
    mintedToken: {
      id: 'a98c6ff0-1e8c-423f-bda7-5a858cdc22ce',
      type: ['VerifiableCredential'],
      issuer:
        'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
      issuanceDate: '2022-11-14T10:16:58.056Z',
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      credentialSubject: [
        {
          date: '2022-11-14T10:16:58.049Z',
          tokenId: '0.0.48461802',
          amount: '1.01',
          '@context': [
            'https://ipfs.io/ipfs/bafkreib67gunqam5jcv6xx3ioapfzyrnvte5wvpmcq56emso5acckercae',
          ],
          type: 'MintToken',
        },
      ],
      proof: {
        type: 'Ed25519Signature2018',
        created: '2022-11-14T10:16:58Z',
        verificationMethod:
          'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797#did-root-key',
        proofPurpose: 'assertionMethod',
        jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..4BY3njVfPxpAg4yEef2PmrW9aPAgjBISS4cBHM_kZ_1o7ofxtHnrEC1Zq7aMsqvgS4fUnJ3nfXNeU7ShTtS7DA',
      },
    },
    vpDocument: {
      id: '6cc74552-e081-4169-a70e-41eb9d3bbbbe',
      type: ['VerifiablePresentation'],
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      verifiableCredential: [
        {
          deviceId:
            'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
          vc: [
            {
              id: '0224355a-5c07-4299-851b-58fbb7b533ba',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:22:10.600Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4246967_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:15:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:20:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014558,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:20:00.000Z',
                      hashId: '1a7bd41274ddc80a1589a14764f1a095',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":477.2916666667,"water_treatment.input.electricity":0,"electrolyser.input.solar":323.4166666667,"gas_purification.input.electricity":72.0833333333,"compression.input.solar":0,"water_treatment.input.water":448,"gas_purification.input.solar":0,"compression.input.electricity":14.5833333333,"compression.output.hydrogen":14.5583333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.451167,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.26,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:22:10Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..1vB6CXXe-BlzbVC7Xx91UqjtfushmDEkhUTbiZyFWqMMA9oLBFkYM-rUQJnV4-js7IusKT6SXcj1zoMJtF3ODA',
              },
            },
            {
              id: '70980595-2301-46f8-915b-db0f1d181af0',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:27:05.390Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4246995_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:20:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:25:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014015,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:25:00.000Z',
                      hashId: '411b67e518369657ce9d5d98b0f0fc47',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":497.4083333333,"gas_purification.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":273.4166666667,"gas_purification.input.electricity":67.5833333333,"compression.input.solar":0,"water_treatment.input.water":429.0833333333,"compression.input.electricity":15.25,"compression.output.hydrogen":14.015}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.464193,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.22,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:27:05Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..6NFerpU-566j8cIh7t0bEEp9sn1H3LwrUiIxnf15NfBw7g4j3stLhOeB6Nix-71DrsGZb-Y9J4THIWVqdpp2CQ',
              },
            },
            {
              id: '8d6b80e9-1b78-488d-af28-4de9170d3d55',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:31:56.690Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247023_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:25:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:30:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014498,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:30:00.000Z',
                      hashId: 'e176b84728c4bd366d413b5a3920781a',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":418.3333333333,"electrolyser.input.electricity":598.9458333333,"gas_purification.input.electricity":69.5,"compression.input.electricity":14.9166666667,"water_treatment.input.electricity":0,"electrolyser.input.solar":198.4166666667,"gas_purification.input.solar":0,"compression.input.solar":0,"compression.output.hydrogen":14.4975}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.54669,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.16,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:31:56Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..OQUeeLsF6DvEsYGssX-Lc_L9f0g2jG1ib3GpXNa0SVcsZ6TbmotjfCKpU8DCKG7cyr8rMBy5NxrzyFs392xmCw',
              },
            },
            {
              id: 'bab53fca-c538-4ceb-b724-8f0e057682c5',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:36:58.887Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247050_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:30:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:35:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014279,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:35:00.000Z',
                      hashId: '1e74c8a0ac3fd9a552f068442faa4558',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":417.4166666667,"water_treatment.input.electricity":0,"compression.input.solar":0,"gas_purification.input.electricity":72.25,"electrolyser.input.solar":360.8333333333,"gas_purification.input.solar":0,"compression.input.electricity":14.75,"electrolyser.input.electricity":424.5208333333,"compression.output.hydrogen":14.2791666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.409217,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.29,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:36:58Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..D93hgmZffEK-RFpB56DEIXK3aS9J5RbpMiGDB3GChC8f7nLT4BmvgA9VxUmAwq8CDUdFt6lKMKBbZQxTO58IBA',
              },
            },
            {
              id: '01e37f7b-b274-4338-bdb6-4c25eae2d25e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:42:26.292Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247079_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:35:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014227,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:40:00.000Z',
                      hashId: '1a76bc822c34fbe32d70cfee5a537397',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.electricity":396.55,"compression.input.solar":0,"compression.input.electricity":14.5,"water_treatment.input.water":441.25,"gas_purification.input.solar":0,"electrolyser.input.solar":385.9166666667,"gas_purification.input.electricity":71.4166666667,"compression.output.hydrogen":14.2266666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.385973,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.31,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:42:26Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R20oxaOgVkA9JjRWLAnRbUTDgJlLwF2FHO-e4nawTvdyfVYkwUUCdQMMCHzQRPOEhDXE9HnCpITVYYIXteC7Cg',
              },
            },
            {
              id: '915646b8-2265-425f-94d5-1ba49a7e806e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:47:09.292Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247107_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:40:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014225,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:45:00.000Z',
                      hashId: '34869c953d08f23356d01f16c65397f1',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.electricity":14.9166666667,"water_treatment.input.electricity":0,"electrolyser.input.solar":473.3333333333,"gas_purification.input.electricity":67.6666666667,"water_treatment.input.water":427.3333333333,"electrolyser.input.electricity":309.0416666667,"compression.input.solar":0,"gas_purification.input.solar":0,"compression.output.hydrogen":14.225}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.3133,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.38,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:47:09Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..WQEFyyllU67dyyvWLIZ62lDk04GgabQeUSXlbQmlAVqT_iOOUsfV_9U6NxspawATN4cTnsAzt1kfY8c4-T79Bg',
              },
            },
            {
              id: 'a36812e2-987b-42a0-8e7d-5855be3f56c7',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:52:25.169Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247135_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:45:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014318,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:50:00.000Z',
                      hashId: '6996bae859159e781c5e6c68b3fff2a2',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"compression.input.solar":0,"water_treatment.input.water":416.25,"electrolyser.input.electricity":289.0916666667,"gas_purification.input.electricity":73.25,"electrolyser.input.solar":498.4166666667,"gas_purification.input.solar":0,"compression.input.electricity":15.0833333333,"compression.output.hydrogen":14.3183333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.30194,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.4,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:52:25Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..clZ27FXsi68N9kvQf_LkPkw8Jg-7XNSdrUaybExCPPqFHW52NWmIGBKKexLdrBW4bLwJmJCSi72KetXTmSnqDQ',
              },
            },
            {
              id: '82343d80-19e8-4521-836d-e212a303abd4',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T04:56:51.091Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247163_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:50:00.000Z',
                  intervalEndDateTime: '2022-11-14T04:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013773,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T04:55:00.000Z',
                      hashId: '932848464599cb85452cae62da2013d7',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.solar":0,"compression.input.solar":0,"electrolyser.input.electricity":409.1541666667,"water_treatment.input.electricity":0,"electrolyser.input.solar":348.3333333333,"water_treatment.input.water":434.6666666667,"gas_purification.input.electricity":71.5,"compression.input.electricity":14.9166666667,"compression.output.hydrogen":13.7725}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.396457,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.28,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T04:56:51Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..2_uZf1XPzdQQm4STHSmc2rS7pQPD6j1tBsGTB3zTO4flpNOn23_l2D92kZR88PXG_MNk48Vgt5aSHwvJhgVAAw',
              },
            },
            {
              id: 'bc1c69f5-4c96-4aaa-9cd0-446a7b0576ae',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:02:34.901Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247191_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T04:55:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014688,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:00:00.000Z',
                      hashId: '613922cfba2f7e9a25d6afc1879db17b',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":222.1083333333,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":585.75,"gas_purification.input.electricity":70.0833333333,"gas_purification.input.solar":0,"compression.input.electricity":15.3333333333,"water_treatment.input.water":429.75,"compression.output.hydrogen":14.6883333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.24602,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.47,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:02:34Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..-dv7jRdHFlqfLbFlintWoNSmWXKWMQUtKbtWWB5CtlnKI1F36UFGR3P4QWvtvDfVMFQ1gWQ1C_7BqCVS_YTpBA',
              },
            },
            {
              id: '40ec43f9-de3e-4fe1-8b41-e8128695ba7e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:06:49.390Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247221_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:00:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014003,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:05:00.000Z',
                      hashId: '9ae627f44c98e22d4e83db37e57d596c',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":433.6666666667,"electrolyser.input.electricity":246.85,"electrolyser.input.solar":523.3333333333,"gas_purification.input.solar":0,"compression.input.solar":0,"water_treatment.input.electricity":0,"compression.input.electricity":14.9166666667,"gas_purification.input.electricity":72.8333333333,"compression.output.hydrogen":14.0033333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.26768,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.42,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:06:49Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Qaurkh_Lcne9PBrYJRGwJUWcEJ86O15ZHh1ibMjaa5pMT4zSx_tLRciU4wrhLz9p2Ox_Z0X6sOod6WgLydHLAg',
              },
            },
            {
              id: '5dd0372e-47a1-4422-b2f8-bdb77351b9c0',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:12:07.986Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247247_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:05:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:10:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014617,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:10:00.000Z',
                      hashId: 'b6d5c526fffbe449e96779a289141ff1',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":343,"compression.input.electricity":15.75,"gas_purification.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":460.9166666667,"water_treatment.input.water":449.5,"gas_purification.input.electricity":72.5,"compression.input.solar":0,"compression.output.hydrogen":14.6166666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.345,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.37,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:12:08Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..zGdMeJgeh1bBdo6IIdOrQL9i2xOKHEoauQdkewsCt1StQ2IbVz3CuqgCO7n0yvVXQqYizn6yRAoFYONtADOSAA',
              },
            },
            {
              id: 'd03aa526-d525-41cb-898d-a79264d6a62a',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:16:21.688Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247274_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:10:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:15:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014051,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:15:00.000Z',
                      hashId: '33e05bf4e005ba1aa59cc2e184e33f6c',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.electricity":14.5,"electrolyser.input.electricity":312.0458333333,"water_treatment.input.water":405.3333333333,"gas_purification.input.solar":0,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":460.75,"gas_purification.input.electricity":73.5,"compression.output.hydrogen":14.0508333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.320037,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.37,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:16:21Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..W2lez-Ut_Hvn6EfdrBKTQgB1I2GIdbDwOKXv1Bo6wQv-Y5KZCTGRYb-fp0xRYpujFHPINoJ_0rDZDs6mlAZ0DA',
              },
            },
            {
              id: 'da117fa9-62e8-43f6-bf0d-6acb0b0966e6',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:22:08.072Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247303_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:15:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:20:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014465,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:20:00.000Z',
                      hashId: '2643bc10ad3ede75d71c112d50f9ced7',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":322.325,"gas_purification.input.electricity":72.0833333333,"compression.input.electricity":14.5,"water_treatment.input.electricity":0,"water_treatment.input.water":408.5,"gas_purification.input.solar":0,"compression.input.solar":0,"electrolyser.input.solar":473.25,"compression.output.hydrogen":14.465}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.327127,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.38,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:22:08Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R9HlOxLNDK9UZs75gbWFWeFyqs_GI9QmqsTmy4SGeBC76Voh0evBo8OFrOwhNF4Od4EL-eBjdu2I8poJJNj1Aw',
              },
            },
            {
              id: '78b4a2f4-c57f-489f-ae4d-4adcc4c2f66e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:26:35.377Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247331_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:20:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:25:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014549,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:25:00.000Z',
                      hashId: 'f9deb3d51fcc18c589daae5c0e8d4ca3',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.electricity":326.7875,"gas_purification.input.solar":0,"water_treatment.input.water":437.4166666667,"gas_purification.input.electricity":71.4166666667,"compression.input.electricity":15.0833333333,"electrolyser.input.solar":473.4166666667,"compression.output.hydrogen":14.5491666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.33063,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.38,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:26:35Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..f-Pp9WLEzwlSgPEJ2kQquyl_AvebxUY6E4mOI8bSp6OYGzi-taqsO8KSu-CZTgSK4vJgnRitMXkWDWGec3fZAg',
              },
            },
            {
              id: '034ec581-cd0d-4d10-bdd8-949141d818fd',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:32:23.402Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247359_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:25:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:30:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014083,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:30:00.000Z',
                      hashId: '9306c1055e4593d25cb86cb39162fb29',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":460.75,"gas_purification.input.electricity":68.25,"water_treatment.input.water":420.25,"electrolyser.input.electricity":313.8333333333,"compression.input.electricity":14.75,"gas_purification.input.solar":0,"compression.output.hydrogen":14.0833333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.317467,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.37,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:32:23Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ZBfPUlwEE6P2Rz_8xIzbyGBoxFc1FFnwshIrooxTvSEKPRCLKYzJD_67hbFCL_cPCOe3kTEoSL3LuLj6rWYlDg',
              },
            },
            {
              id: 'ec2bdcd4-982f-44ea-a0c3-e6943bfd8b50',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:37:20.983Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247387_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:30:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:35:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014538,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:35:00.000Z',
                      hashId: '5394ff533db4f771f49b5c69938035c1',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.electricity":326.3583333333,"gas_purification.input.solar":0,"compression.input.electricity":15.25,"electrolyser.input.solar":473.25,"gas_purification.input.electricity":74.1666666667,"water_treatment.input.water":438.0833333333,"compression.input.solar":0,"compression.output.hydrogen":14.5383333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.33262,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.38,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:37:21Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kGvaSY59CJkfbWvf3w6ctygXvPS2N2iNue-NgqU3RCAqLD9S15OIVZNikw-nuz3b7NLxv6XZABcASJA4d-1pAQ',
              },
            },
            {
              id: 'd6799f73-c78a-4441-9d7d-c3d152003f0d',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:42:26.516Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247415_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:35:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013903,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:40:00.000Z',
                      hashId: 'eecafe371de63824a9d31d2f4df0729d',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.solar":460.8333333333,"electrolyser.input.electricity":303.85,"compression.input.electricity":15.5,"gas_purification.input.solar":0,"compression.input.solar":0,"water_treatment.input.water":408.4166666667,"gas_purification.input.electricity":70.4166666667,"compression.output.hydrogen":13.9033333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.311813,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.37,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:42:26Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BMUqgnsys0VUfnGgQr-MlpIw3i3YrHJh_ID77TxSTg6RBtB-91GpP2WHiqi9sL_4zPBE88sSZ3UdqTnS9nGuCg',
              },
            },
            {
              id: '4ddbc1a0-4f59-466c-b6f2-a0e366b070ea',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:47:05.290Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247442_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:40:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014068,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:45:00.000Z',
                      hashId: '0ed3278e43a7ad1d9850964bc729304d',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":337.925,"electrolyser.input.solar":435.8333333333,"gas_purification.input.electricity":74.9166666667,"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"compression.input.electricity":15.4166666667,"water_treatment.input.water":423,"compression.input.solar":0,"compression.output.hydrogen":14.0683333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.342607,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.35,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:47:05Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..vHYFhYbkV6AlcNqtMFXNmH0J95aeUUYpEFW8onlEjZcK6KKav-S0Liko2rrZCH9bfUbj5BQlJdQTZpynzXqkAA',
              },
            },
            {
              id: '88c37dae-e60a-43c6-8f92-e88d75164337',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:52:10.903Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247471_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:45:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014891,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:50:00.000Z',
                      hashId: '4cbaabd1e7c7acfa6968c638c95211b7',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.solar":410.8333333333,"water_treatment.input.water":429.9166666667,"gas_purification.input.electricity":74.75,"gas_purification.input.solar":0,"compression.input.electricity":14.5,"electrolyser.input.electricity":408.1625,"compression.input.solar":0,"compression.output.hydrogen":14.8908333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.39793,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.33,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:52:10Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..6mJP33OhkpAGaTZEPDDz70pTGWrLEkyPS9E_eGdWhvcFCR_Y5fIZD_AKILHcQzXaRNmffm_z4sLYAqioqYBGDg',
              },
            },
            {
              id: '6dccc71f-8473-4f92-aac9-4c81d7000a8c',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T05:56:42.566Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247498_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:50:00.000Z',
                  intervalEndDateTime: '2022-11-14T05:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01446,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T05:55:00.000Z',
                      hashId: '47dc4dc70f1f32f6aa3b255b06386fdf',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"gas_purification.input.solar":0,"water_treatment.input.water":436.5833333333,"electrolyser.input.electricity":409.55,"compression.input.electricity":14.25,"water_treatment.input.electricity":0,"gas_purification.input.electricity":72.0833333333,"electrolyser.input.solar":385.75,"compression.output.hydrogen":14.46}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.396707,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.31,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T05:56:42Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..XzG8Y0iNhVsCbQ2nckegKUbYu8TQkQD9lHfMS6Jlr59tEWDK_cetX5KY7FFj_JK0jTSby5mM2Z9u5sm34d9rAA',
              },
            },
            {
              id: '565e86fa-2eaf-4e58-9ead-750f8f07616e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:01:44.867Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247528_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T05:55:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014316,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:00:00.000Z',
                      hashId: 'c29a72e2111e7e1cb0aadc9b51a807df',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.electricity":426.5375,"gas_purification.input.electricity":71.9166666667,"compression.input.solar":0,"water_treatment.input.water":435.6666666667,"electrolyser.input.solar":360.8333333333,"gas_purification.input.solar":0,"compression.input.electricity":14.6666666667,"compression.output.hydrogen":14.3158333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.410497,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.29,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:01:44Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..SAIHDLZ8Y_lE6S2ATF0zxemndgGEmYt2k-Ee7aC7vuPSOGHjPpXsX7JJ0rR-9rKVtMqhtLU6WP2vRKDQ6u4pAg',
              },
            },
            {
              id: '86c65860-baa6-4f06-8a8e-7a6668649423',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:06:30.101Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247554_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:00:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014012,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:05:00.000Z',
                      hashId: 'fb322abbdb71d0cc0da3450eb907d72d',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"gas_purification.input.electricity":71.6666666667,"compression.input.electricity":15.1666666667,"electrolyser.input.solar":335.8333333333,"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"water_treatment.input.water":412.1666666667,"electrolyser.input.electricity":434.8541666667,"compression.output.hydrogen":14.0125}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.41735,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.27,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:06:30Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..92M_4sZI0sJX5W8bVzeo22cW2Rp2eo6WhV4RBufCDQ5uFjfHyt3IfPsRab55x5eZzup3IvV1YvQ-ftRthHIiCQ',
              },
            },
            {
              id: '45e9b2be-5ce8-4d20-b98f-a705376e6586',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:12:25.290Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247584_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:05:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:10:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01442,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:10:00.000Z',
                      hashId: '89b98ac178e9cd7579eac650009b42c3',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.solar":323.4166666667,"electrolyser.input.electricity":469.6833333333,"compression.input.solar":0,"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"compression.input.electricity":14.8333333333,"water_treatment.input.water":413.3333333333,"gas_purification.input.electricity":69,"compression.output.hydrogen":14.42}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.442813,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.26,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:12:25Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..yCGyof88RaZ4AUdp_EDD4RsBJe4YYagiHJo1qQ4WHo3b3tYQEdVN5kadPfxTBDti8mvp7IIMi6TGgw-0aki5AQ',
              },
            },
            {
              id: '3e2aa43d-2dd8-4881-b001-b89fe0caa38a',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:16:25.116Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247611_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:10:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:15:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014321,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:15:00.000Z',
                      hashId: '9a07d25b4d37c856eb6d93e29e6a3dad',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":501.8125,"compression.input.electricity":15.5833333333,"water_treatment.input.electricity":0,"electrolyser.input.solar":285.8333333333,"compression.input.solar":0,"water_treatment.input.water":431.9166666667,"gas_purification.input.solar":0,"gas_purification.input.electricity":69.8333333333,"compression.output.hydrogen":14.3208333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.469783,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.23,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:16:25Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..zPwIh-ynmaTC-98RlE5jl7msvttmMBUcBLcajLPppBox8tE_HzHADun38s_O0siVK4c03JBP9FMhh_4xjD_zDQ',
              },
            },
            {
              id: '6903d743-783d-4bac-9be1-7c44d64d296b',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:21:59.588Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247636_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:15:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:20:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014013,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:20:00.000Z',
                      hashId: 'e3c626a37dfc2d92c2d4a74e10ba920b',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"water_treatment.input.electricity":0,"gas_purification.input.electricity":73.75,"electrolyser.input.solar":273.3333333333,"gas_purification.input.solar":0,"electrolyser.input.electricity":497.4,"compression.input.electricity":14.5833333333,"water_treatment.input.water":436.4166666667,"compression.output.hydrogen":14.0133333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.468587,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.22,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:21:59Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..QVgpKmr_v12zh9KzorwGRIs-HvgLeXKGYRNqP6vOPZyMgQGjeZevedRQziqmuO55eL3OKNfUWqBMJfioCVbfDw',
              },
            },
            {
              id: '01935d2a-920b-4eec-a94e-834bffa8559a',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:26:53.218Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247667_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:20:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:25:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014745,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:25:00.000Z',
                      hashId: '970e9605025bb6b9ed8fc7e92a46fa40',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"gas_purification.input.electricity":69.5833333333,"water_treatment.input.water":413.75,"electrolyser.input.electricity":562.725,"compression.input.electricity":15,"water_treatment.input.electricity":0,"electrolyser.input.solar":248.25,"gas_purification.input.solar":0,"compression.output.hydrogen":14.745}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.517847,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.2,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:26:53Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..laxNKb33im5kWiiWHwfe_NKcyMH-YUMEYziyDwK1f8qZKlzUDOGkQaorc_yJwPaCqvgEfg8ge-BstqJ54t_-Cg',
              },
            },
            {
              id: '4fad415e-e7b6-42c6-acbb-1bd360c4bfa2',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:31:40.869Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247695_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:25:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:30:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013563,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:30:00.000Z',
                      hashId: '584dca68dac885cfea831576ee793c30',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"gas_purification.input.electricity":68.6666666667,"water_treatment.input.water":428.4166666667,"electrolyser.input.solar":235.8333333333,"gas_purification.input.solar":0,"compression.input.electricity":14.1666666667,"electrolyser.input.electricity":510.15,"compression.input.solar":0,"compression.output.hydrogen":13.5633333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.474387,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.19,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:31:40Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ADP2DCLpmjO8oVwae0tGrbsabmOWIP0sEow0Enz5vqF35x1z52IQT2E4RHCDoXl6QaDX9baj8q2djZNWE2bBAg',
              },
            },
            {
              id: '68ed2382-dd1f-49b3-8dbc-0de4dfb0e2ff',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:37:30.086Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247723_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:30:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:35:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014412,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:35:00.000Z',
                      hashId: 'd2fdb9f4959b167d628f50849780299d',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.electricity":74,"water_treatment.input.water":439.4166666667,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":210.9166666667,"compression.input.electricity":14.4166666667,"electrolyser.input.electricity":581.725,"gas_purification.input.solar":0,"compression.output.hydrogen":14.4116666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.536113,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.17,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:37:30Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..I4X0PuLHZHX3jrSM9oDfkCk-RzyqOO8YH8zJl90t_ple5JovEZ1NgHh6vlcxpWEoUOyd6KUasfAka2jWRVMZDg',
              },
            },
            {
              id: '8cd7a125-6f5c-41bf-817f-94b2e577230b',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:42:06.581Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247751_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:35:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014801,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:40:00.000Z',
                      hashId: '3c8a888a0c26ab58069d67310433666c',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":447.0833333333,"electrolyser.input.electricity":615.7125,"gas_purification.input.electricity":73.6666666667,"compression.input.electricity":15,"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"electrolyser.input.solar":198.3333333333,"compression.input.solar":0,"compression.output.hydrogen":14.8008333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.563503,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.16,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:42:06Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..J4qA3Qw1sVKXBSm9kqBivbjwjXUwMPchYXX-5oF0vqFum0ciOgy5t6XKtAvvO0HbD6Ltd4xe-S1VMZe-33oSBQ',
              },
            },
            {
              id: '4eaf82d3-71c2-4bf9-a857-b03f28568e0e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:47:22.476Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247779_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:40:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01394,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:45:00.000Z',
                      hashId: 'a723bdf5f71743220bf5724cbe8fc100',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.electricity":593.2833333333,"gas_purification.input.electricity":74,"water_treatment.input.water":447.5,"gas_purification.input.solar":0,"compression.input.solar":0,"compression.input.electricity":15,"electrolyser.input.solar":173.4166666667,"compression.output.hydrogen":13.94}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.545827,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.14,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:47:22Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..94oxilTwRRP2V243fPOzwM5MfHvGUiSFHAo5C0IClsd2a-8ZaOb0zQ2l-A6o4kO4o9kVznhNow5Gsl6JJB34CA',
              },
            },
            {
              id: 'ac895e62-03d7-44e0-aacc-6a857ff4cbef',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:51:47.683Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247807_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:45:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014219,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:50:00.000Z',
                      hashId: 'a9f8aa197bff2411a26194cc5faffea8',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":429.4166666667,"water_treatment.input.electricity":0,"electrolyser.input.solar":160.8333333333,"gas_purification.input.solar":0,"compression.input.electricity":15.1666666667,"electrolyser.input.electricity":621.2208333333,"gas_purification.input.electricity":74.75,"compression.input.solar":0,"compression.output.hydrogen":14.2191666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.56891,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.13,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:51:47Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..dlHqHOmiGnbw0EkU1v6XVLpHSUTc8SDsW7Qme_O0djBtg2BhZNykR6iM5ij1dfH3tjw00iPEHg7ugaw1pTfRDw',
              },
            },
            {
              id: 'b81db9b0-d167-4664-ad56-465b1cc24d83',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T06:56:37.994Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247835_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:50:00.000Z',
                  intervalEndDateTime: '2022-11-14T06:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013926,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T06:55:00.000Z',
                      hashId: '37e1fc32e2ddda5ad91014a9f96bc878',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.solar":160.8333333333,"gas_purification.input.electricity":73.5833333333,"compression.input.electricity":15.5833333333,"gas_purification.input.solar":0,"water_treatment.input.water":413.5,"compression.input.solar":0,"electrolyser.input.electricity":605.0875,"compression.output.hydrogen":13.9258333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.555403,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.13,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T06:56:38Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..d73TWDYmZph6WsrQKqe_IZ8cGebfWINC29SnztYhpYkKpaYbu1TTH_k9M7EDxqcHqTD3MyD9lQ6nLcUO91lcAQ',
              },
            },
            {
              id: '83a8aa01-0d81-408b-beb1-6152b3530ccf',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:06:00.571Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247864_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T06:55:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014737,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:00:00.000Z',
                      hashId: '0cb54a845c9382ec917994d53eccf8ff',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":662.2666666667,"gas_purification.input.electricity":73.0833333333,"compression.input.electricity":15.5833333333,"water_treatment.input.water":415.9166666667,"gas_purification.input.solar":0,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":148.25,"compression.output.hydrogen":14.7366666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.600747,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.12,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:06:00Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..MwAWO1u8iVZ2SJFV0FdByBpG8cuisn9sLY6I_M65RoumzwTM1v6ICfX7FcwzipoBVWw2QU2pO1fxZK8q19xjAg',
              },
            },
            {
              id: '836bcc89-5ab4-4024-b65e-48df7b965751',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:07:01.085Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247890_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:00:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014868,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:05:00.000Z',
                      hashId: '13831a46d97f2a1dd611a085ed270719',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":435.75,"electrolyser.input.solar":135.75,"compression.input.solar":0,"gas_purification.input.solar":0,"gas_purification.input.electricity":70.9166666667,"compression.input.electricity":15.6666666667,"water_treatment.input.electricity":0,"electrolyser.input.electricity":681.9625,"compression.output.hydrogen":14.8675}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.614837,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.11,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:07:01Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..KyhWioKD3ieUMxfVt9LVZSQklwKmI5X5A0UInMRyTsWI2IHoW7cgMTtip6d0OgzwCkksZLtA2SdS4bsRQritAg',
              },
            },
            {
              id: '0e4712c6-b300-4e44-be68-a0a1f9bfd3ad',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:11:12.270Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247921_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:05:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:10:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013871,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:10:00.000Z',
                      hashId: '785a70ec1da6bcc15f48e853c3f17982',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"compression.input.electricity":14.3333333333,"water_treatment.input.water":405.0833333333,"electrolyser.input.electricity":652.1458333333,"gas_purification.input.electricity":68.0833333333,"electrolyser.input.solar":110.75,"compression.input.solar":0,"compression.output.hydrogen":13.8708333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.58765,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.09,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:11:12Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R-2uEGRC0clYFGf7MU2oa2EtcMDaXfTsx5d8CvXlx0zBhezgImVM1pfOKdXl9QbrRtAcphm0DDJmEfw5CZKkBw',
              },
            },
            {
              id: 'af122e0d-fdf4-47c4-b56a-a211aa00c070',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:16:07.303Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247947_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:10:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:15:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013823,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:15:00.000Z',
                      hashId: '52f678d8e79759664aa45a137a9eb8b7',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.solar":0,"water_treatment.input.water":434.25,"compression.input.electricity":15.3333333333,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.solar":73.4166666667,"gas_purification.input.electricity":71.25,"electrolyser.input.electricity":686.8666666667,"compression.output.hydrogen":13.8233333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.61876,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.06,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:16:07Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ipvcLZqOM99XciKZWIihm5lZVhsMxHS8UF4qZLJsfs1dQjH-FAt3T7SmAAS_CHB9MbRRa-us73GZor_bJMqUCQ',
              },
            },
            {
              id: '0046da4c-d8c5-4107-b4f3-96cf9ab2476b',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:21:55.091Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4247975_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:15:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:20:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01359,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:20:00.000Z',
                      hashId: '9fbafcaa728670667e7e595631dfd90d',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.electricity":73.5,"compression.input.electricity":14.8333333333,"water_treatment.input.electricity":0,"compression.input.solar":0,"electrolyser.input.electricity":649.1166666667,"electrolyser.input.solar":98.3333333333,"water_treatment.input.water":417.9166666667,"gas_purification.input.solar":0,"compression.output.hydrogen":13.59}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.58996,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.08,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:21:55Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ufzaOeR0c5DVIFzOyCkBfm-xZvMHkDUlBlXAzDyWj-2c1EyB0ZW2q9powb76Uipk1j_NwYQIdsYH3riQ4-mICw',
              },
            },
            {
              id: '271b9117-2d74-4e67-a8c1-9113854aa525',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:26:20.377Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248003_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:20:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:25:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013486,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:25:00.000Z',
                      hashId: 'bf7ea05a86eaf49fad43e13006d3c635',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.solar":60.75,"gas_purification.input.electricity":70.4166666667,"water_treatment.input.electricity":0,"electrolyser.input.electricity":680.9708333333,"gas_purification.input.solar":0,"compression.input.electricity":14.75,"water_treatment.input.water":414.75,"compression.input.solar":0,"compression.output.hydrogen":13.4858333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.61291,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.05,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:26:20Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..3w27xhS-_SEiH5AsLs2QbN8oJqzXswBUVlw9Y_Y89-xTsuc0hypy1yivZ_yb7hz0YFM-bfC8DrYC3oaghVWzDA',
              },
            },
            {
              id: 'e0e3f5f0-0e02-41d5-a8c5-2101cd7bb3b1',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:31:15.381Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248036_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:25:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:30:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014416,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:30:00.000Z',
                      hashId: 'd306ab73c1ac4a740445e21e9485e932',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":406.6666666667,"gas_purification.input.electricity":70.6666666667,"electrolyser.input.solar":60.75,"compression.input.electricity":15.25,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.electricity":732.1208333333,"gas_purification.input.solar":0,"compression.output.hydrogen":14.4158333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.65443,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.05,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:31:15Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..hVrDp4koAgnN78poH8aWoIRixWBEhSJIGj_bNubJhzvM6slABSWpslG47v14Onz2DM46LMvGzZp-obfGfuTkCg',
              },
            },
            {
              id: '6cfd4d24-4d53-464a-81fb-7052d899aa0e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:36:25.203Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248059_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:30:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:35:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014756,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:35:00.000Z',
                      hashId: '71bd99346fb62af06b55384e24221d6f',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":763.3208333333,"gas_purification.input.electricity":71.9166666667,"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"compression.input.electricity":15,"water_treatment.input.water":425.75,"electrolyser.input.solar":48.25,"compression.input.solar":0,"compression.output.hydrogen":14.7558333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.68019,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.04,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:36:25Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rcYx3igaDLVG-ETkMFF5AE8bMscruUcl7qqtlYvzDEdO4__7laqg5Ycl2VtMN1UgEK3Tud3mvGkshF0svBGCCg',
              },
            },
            {
              id: 'c87d37ad-29f3-4ecb-aecc-f17ed0a40e3c',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:41:45.775Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248087_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:35:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013936,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:40:00.000Z',
                      hashId: '3e01f51199b26912c5d7c63734d00982',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.solar":35.75,"gas_purification.input.electricity":70.0833333333,"water_treatment.input.electricity":0,"electrolyser.input.electricity":730.7208333333,"compression.input.solar":0,"water_treatment.input.water":448.25,"gas_purification.input.solar":0,"compression.input.electricity":14.3333333333,"compression.output.hydrogen":13.9358333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.65211,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.03,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:41:45Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..muwcn0V_Tz54YzRTiMWADPCZNKpmmbnvP5TAWIzPsjvw0IY3bz7Gzu7Em-pxOqAxGexdM_nnWTW1YuW-RUaMDg',
              },
            },
            {
              id: '972a3cd9-2b29-475f-9a07-3ab6cd8ccf84',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:46:05.094Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248114_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:40:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014133,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:45:00.000Z',
                      hashId: 'e4ab5d5bfe905374cccaf479e20c01e5',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.electricity":69.5833333333,"compression.input.solar":0,"water_treatment.input.electricity":0,"electrolyser.input.electricity":741.5,"water_treatment.input.water":424.8333333333,"electrolyser.input.solar":35.8333333333,"gas_purification.input.solar":0,"compression.input.electricity":15.25,"compression.output.hydrogen":14.1333333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.661067,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.03,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:46:05Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..I-nQ6Lm_G20KgDShCFqaCjtlaIBTPPUUW5NekfzhBcAFeup4AaqEG7MTsDQQdVSJ31c4V6heO702sMtY0dpTBw',
              },
            },
            {
              id: '93ce8133-4e5b-4b5f-981d-2dd3049cc137',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:51:39.982Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248143_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:45:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014213,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:50:00.000Z',
                      hashId: '0dd5dbe471fbe40e1a0331e0e10932d2',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"electrolyser.input.solar":35.9166666667,"compression.input.electricity":15.1666666667,"water_treatment.input.water":450,"electrolyser.input.electricity":745.8166666667,"gas_purification.input.electricity":73.4166666667,"gas_purification.input.solar":0,"compression.input.solar":0,"compression.output.hydrogen":14.2133333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.66752,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.03,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:51:40Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kGEjIV24y4zCPN7uy_aSu5B2JJRNs1YgNvwZ-a1HtxU6I0NxPfmbenO5I_UI8pqJSRZOor4Y1Caq_oF_FBhkAw',
              },
            },
            {
              id: 'c999903e-ab04-48c2-9ef8-2dd83527e35a',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T07:56:55.285Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248171_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:50:00.000Z',
                  intervalEndDateTime: '2022-11-14T07:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01405,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T07:55:00.000Z',
                      hashId: 'd4dcd30fb2bc72a8e38d986cad290d3c',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.solar":10.9166666667,"gas_purification.input.electricity":72.75,"compression.input.electricity":14.9166666667,"compression.input.solar":0,"water_treatment.input.water":429.5833333333,"electrolyser.input.electricity":761.8333333333,"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"compression.output.hydrogen":14.05}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.6796,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.01,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T07:56:55Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..8E0WpD1c5fjfeuQ_tYvujI4sdR0rWjmpGMgFW9iI4olwkC6B5FOfsqB593lU2_5jq7HLGvLxk8w-wU1DWCATBg',
              },
            },
            {
              id: '0d55a3c8-df15-4c6e-a238-11dfc817bf57',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:01:19.585Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248199_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T07:55:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.0146,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:00:00.000Z',
                      hashId: '3e444a94e83a9847be9214a5d10bc722',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":0,"gas_purification.input.solar":0,"compression.input.solar":0,"water_treatment.input.water":415.5833333333,"electrolyser.input.solar":10.75,"electrolyser.input.electricity":792.25,"gas_purification.input.electricity":67.75,"compression.input.electricity":14.4166666667,"compression.output.hydrogen":14.6}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.699533,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0.01,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:01:19Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..q3rAxST4YMsgrHMLFbVMSIwKwqfeS3AO9v417LX8JHETjMJ0nMOBSUEuRrPoGao0SNWoBV8yqGvMJZlQ8vmMDQ',
              },
            },
            {
              id: '1884f06a-274c-4469-ad48-1cb2a66a5cf8',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:06:49.766Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248226_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:00:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014202,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:05:00.000Z',
                      hashId: '22998488158921ee1423068b743b65e8',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.solar":0,"electrolyser.input.electricity":781.0916666667,"compression.input.solar":0,"water_treatment.input.water":414.0833333333,"compression.input.electricity":14.25,"electrolyser.input.solar":0,"water_treatment.input.electricity":1.5833333333,"gas_purification.input.electricity":67.75,"compression.output.hydrogen":14.2016666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.69174,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:06:49Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..JEdO91pIXSp-ORaCcqpeby8ASAcAA5Xi3qRDr_EXZkmyXMhaVXL3t-259gN2HxlG03lduvosRlZHbF2BCIdcBQ',
              },
            },
            {
              id: '25b4ce62-9e6f-4925-8bde-9bd66a3b32f2',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:11:05.592Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248255_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:05:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:10:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014466,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:10:00.000Z',
                      hashId: '6fb5bec48b7f328c7d2207f0e7c9d6b9',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.5833333333,"gas_purification.input.electricity":71.1666666667,"compression.input.solar":0,"compression.input.electricity":15.4166666667,"electrolyser.input.electricity":795.6208333333,"gas_purification.input.solar":0,"water_treatment.input.water":433.3333333333,"electrolyser.input.solar":0,"compression.output.hydrogen":14.4658333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.70703,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:11:05Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..vhiNpe6hgEp3YSd9b62ZUa1-4jCFP6AKjep3HaZ64oIWUDTLQEGr72vBjB6xREegmCRqUvfpJkV7L_3VSDyJDw',
              },
            },
            {
              id: '630776ff-1bb5-4a3a-84c7-3b7c1e3e6b23',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:16:40.585Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248283_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:10:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:15:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014138,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:15:00.000Z',
                      hashId: 'a6e25236247c80201f6dda44b145c645',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":777.6083333333,"gas_purification.input.solar":0,"compression.input.electricity":14.1666666667,"water_treatment.input.electricity":1.75,"gas_purification.input.electricity":70.25,"compression.input.solar":0,"water_treatment.input.water":448.25,"electrolyser.input.solar":0,"compression.output.hydrogen":14.1383333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.69102,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:16:40Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Tp0RHXEdVOx7LijE2Lm9NkkaUogBdd10Ip9LZhNlxg-2N9n4sQ01wq2Wtiu-RUKYmBmngn1vbh5zo0RDSQ6JBQ',
              },
            },
            {
              id: '08398e09-55ee-4488-a8ec-377b1cb8604b',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:21:02.723Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248310_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:15:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:20:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013682,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:20:00.000Z',
                      hashId: '6b8ee7fb52a4a18bd98d3039472afa9b',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"electrolyser.input.electricity":752.4916666667,"gas_purification.input.solar":0,"gas_purification.input.electricity":70.25,"water_treatment.input.water":431.5,"compression.input.solar":0,"compression.input.electricity":14.9166666667,"electrolyser.input.solar":0,"compression.output.hydrogen":13.6816666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.671527,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:21:02Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..9is9gX4ttZ0qO2LZo8cu-_mL_XcLZDfei3j-HQDeEOwQc0LP2wjxFAISWNRT_fAjU471PIyN35cX55KZSXMjCQ',
              },
            },
            {
              id: '7aafe1fc-87f6-4e44-906f-98be6337e460',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:26:40.482Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248339_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:20:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:25:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014663,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:25:00.000Z',
                      hashId: 'abd3b394996f50c7fa24327227b98c14',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":806.4375,"gas_purification.input.electricity":68.6666666667,"water_treatment.input.electricity":1.6666666667,"electrolyser.input.solar":0,"compression.input.solar":0,"gas_purification.input.solar":0,"compression.input.electricity":14.4166666667,"water_treatment.input.water":438.0833333333,"compression.output.hydrogen":14.6625}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.71295,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:26:40Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..WTZlbkEaABb1_WVCLZutQsswZmGyrvp4DaLRWp3hwn7LgTdvO4uTukEWz9T3fJkQJmMflYt7wNu5P1kKqYrKAw',
              },
            },
            {
              id: '68a0d01e-4309-40b0-be23-9ce88be34319',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:31:33.011Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248367_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:25:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:30:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014323,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:30:00.000Z',
                      hashId: 'a9a63b92fe881e84aca1da279e43985e',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"electrolyser.input.electricity":787.7833333333,"water_treatment.input.water":438,"compression.input.solar":0,"gas_purification.input.solar":0,"compression.input.electricity":15.3333333333,"electrolyser.input.solar":0,"gas_purification.input.electricity":72.9166666667,"compression.output.hydrogen":14.3233333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.702227,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:31:33Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19.._7nMDAOmaJfaAFcmnnW8j3nB87tIO_fgQMvEJsqtr440HssdyjcZqpm7Fc2ZfqLRlySJ9qiC3PJ71n7f7zkBAA',
              },
            },
            {
              id: '862ee267-bea5-4280-ae01-19b3a9dd2696',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:36:15.300Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248396_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:30:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:35:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013967,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:35:00.000Z',
                      hashId: '4a9c29842acf5f99fcc961ab6b0e3966',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"electrolyser.input.solar":0,"compression.input.solar":0,"electrolyser.input.electricity":768.2125,"gas_purification.input.electricity":70.5,"compression.input.electricity":15,"water_treatment.input.water":416.5833333333,"gas_purification.input.solar":0,"compression.output.hydrogen":13.9675}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.68437,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:36:15Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..i_6B5RWX3pun1iRnHqq2XWsStVWPfsDxqMJV8z-EeigNBd7shdYF3ve59SgO5Ty8SOpbR7S2kv0Sx_1ixQdvDA',
              },
            },
            {
              id: '5c8bad03-398c-40f0-8917-a2b198c1bbfc',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:41:35.475Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248423_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:35:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014204,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:40:00.000Z',
                      hashId: '3e79e1798bc3d2119c97c6a665ca9329',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"compression.input.solar":0,"gas_purification.input.solar":0,"gas_purification.input.electricity":74.0833333333,"water_treatment.input.water":433.1666666667,"electrolyser.input.solar":0,"compression.input.electricity":15.1666666667,"electrolyser.input.electricity":781.2291666667,"compression.output.hydrogen":14.2041666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.697783,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:41:35Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..7ud-1yx811ZEORHj2JMw5ndoAwBMuLXrYLDWkA51hGt5nwJPf_Tip4MskuIsYJ0GBGpybs4HLv_lp05H37fzAw',
              },
            },
            {
              id: '0fc75fa9-91d3-473e-a8bb-cdfc8f8c81f2',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:46:22.186Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248451_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:40:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.001382,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:45:00.000Z',
                      hashId: '00bdc5ecadd74b1ad440f66ac0146dbc',
                    },
                  ],
                  otherMRVData:
                    '{"gas_purification.input.solar":0,"gas_purification.input.electricity":7.1166666667,"compression.input.electricity":1.475,"water_treatment.input.electricity":0.1583333333,"electrolyser.input.solar":0,"compression.input.solar":0,"water_treatment.input.water":44.05,"electrolyser.input.electricity":75.9825,"compression.output.hydrogen":1.3815}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.067786,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:46:22Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..dm2wbI0T37I7-imaA1O-V18GeEEixiqVjwUxcmkzcOQOJEXyOKcqRHvTufpy3pkf2TlMSWcqzwVn2mT7TZk_DA',
              },
            },
            {
              id: '34ce622f-58ac-4003-93ec-50e55ce99b2e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:52:00.089Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248479_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:45:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014513,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:50:00.000Z',
                      hashId: '13a3ecb1c72dcbf31c5ce6aa50186d94',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":406.8333333333,"water_treatment.input.electricity":1.5833333333,"electrolyser.input.electricity":798.2333333333,"compression.input.solar":0,"electrolyser.input.solar":0,"gas_purification.input.electricity":69.75,"compression.input.electricity":15.25,"gas_purification.input.solar":0,"compression.output.hydrogen":14.5133333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.707853,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:52:00Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..7_ESxummNmdIvT0QiG1qxM6qnMCSpcTc9A410EHPz2NYDcdLKpyLyjvPUy5nk_KXIocGyp1Oc4Z1xvfEd49NDw',
              },
            },
            {
              id: '805ae115-5e13-40c2-ac95-f26eb19fa310',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T08:56:24.605Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248507_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:50:00.000Z',
                  intervalEndDateTime: '2022-11-14T08:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014293,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T08:55:00.000Z',
                      hashId: '17c0b002c3a4db7eaf0087486527735a',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.5833333333,"compression.input.electricity":14.3333333333,"water_treatment.input.water":446.5833333333,"electrolyser.input.electricity":786.0875,"electrolyser.input.solar":0,"gas_purification.input.electricity":70.0833333333,"gas_purification.input.solar":0,"compression.input.solar":0,"compression.output.hydrogen":14.2925}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.69767,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T08:56:24Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..1g4r2Eii9arlbT3OMkf8fp7jtT5eXVq8MpOIzBfPyJ1zmEKQvEayeB8gVkbXmOU0YYlrNyu1mKY8ATlWUCNbAA',
              },
            },
            {
              id: '3289d4be-539f-4ad6-82d5-668674baeac6',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:01:33.874Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248534_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T08:55:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014503,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:00:00.000Z',
                      hashId: 'adb62f93975246195a47c2190e4aacdc',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":797.6375,"compression.input.electricity":15.0833333333,"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":420.8333333333,"electrolyser.input.solar":0,"gas_purification.input.solar":0,"compression.input.solar":0,"gas_purification.input.electricity":68.8333333333,"compression.output.hydrogen":14.5025}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.706577,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:01:33Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..04azmXGu-1RIDr177uTdWZX9fOMHdEtPn7r2lcnJPqB1aFT7KADwsV2xEj441d85H0Yt8DxTQ_acm0n6lRK3AQ',
              },
            },
            {
              id: '4c554fc7-e5ca-4682-ab71-12483f6b9942',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:06:24.576Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248563_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:00:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014519,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:05:00.000Z',
                      hashId: 'e06eb17fce5e313e4ce7715ca09614ad',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":433.5,"water_treatment.input.electricity":1.5833333333,"electrolyser.input.electricity":798.5541666667,"electrolyser.input.solar":0,"gas_purification.input.electricity":70.1666666667,"gas_purification.input.solar":0,"compression.input.electricity":15.5,"compression.input.solar":0,"compression.output.hydrogen":14.5191666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.708643,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:06:24Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..HxrzZAZS7cTE864kUoIQfuYcCmmybgIbRDJX-LMb5QQE_z2HO66Sz4jcwSY_Wkj2GGcMl3dU6lje64QSGsj9Dw',
              },
            },
            {
              id: '39f5484d-4426-4c96-9300-ca8ecd0b1394',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:11:37.587Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248590_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:05:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:10:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014435,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:10:00.000Z',
                      hashId: 'b0781aa11a29f1e9cdec26d84d423e75',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":413.1666666667,"electrolyser.input.electricity":793.925,"electrolyser.input.solar":0,"gas_purification.input.electricity":74.8333333333,"gas_purification.input.solar":0,"compression.input.electricity":14.75,"compression.input.solar":0,"compression.output.hydrogen":14.435}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.70814,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:11:37Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..lj7bFy0UX3ryQcOwHMr0NvqRC3uqoY8OaPKC562453pkBt3T24kUuQntDX8DEQXnog1gsjw329XToDKSYwFhDw',
              },
            },
            {
              id: '36f7c95b-4ee1-4f32-b5fe-6d84d1b5e093',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:16:36.885Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248619_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:10:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:15:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013595,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:15:00.000Z',
                      hashId: 'ebbae2bd9d376d1b103f32ce58b80c8f',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"water_treatment.input.water":414.5,"electrolyser.input.electricity":747.725,"electrolyser.input.solar":0,"gas_purification.input.electricity":68,"gas_purification.input.solar":0,"compression.input.electricity":14.6666666667,"compression.input.solar":0,"compression.output.hydrogen":13.595}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.665713,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:16:36Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..VLfY1sd3P-IyNlq21QmfComQeYIuxEGPwBWyFSy90Ra6_HHq0-ElNA_GCEAzDtconHYbkGUWjLQpdWfJVAybCA',
              },
            },
            {
              id: 'd7c2aebc-1c84-41e9-8589-c7e95774fec9',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:22:00.570Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248649_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:15:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:20:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014331,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:20:00.000Z',
                      hashId: 'bbaad36a22a9758829840c786ff97a28',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":447.6666666667,"water_treatment.input.electricity":1.5833333333,"electrolyser.input.electricity":788.1958333333,"electrolyser.input.solar":0,"gas_purification.input.electricity":69.1666666667,"gas_purification.input.solar":0,"compression.input.electricity":14.5,"compression.input.solar":0,"compression.output.hydrogen":14.3308333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.698757,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:22:00Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..O2VJURnsnz3Iod40ZzfOIPz0Nku8asruBCmvRjnZTLm_8t1nr-yiVYWKk9TJG8BSr1dPffW1nuPZdaQ0Fo3gDg',
              },
            },
            {
              id: '915a2f74-04e5-4619-87ae-ebb63d3c487e',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:26:17.173Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248677_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:20:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:25:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014163,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:25:00.000Z',
                      hashId: '721974a27c3285ae7e5595750f89e940',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"water_treatment.input.water":442.5,"electrolyser.input.electricity":778.9833333333,"electrolyser.input.solar":0,"gas_purification.input.electricity":68.9166666667,"gas_purification.input.solar":0,"compression.input.electricity":14.3333333333,"compression.input.solar":0,"compression.output.hydrogen":14.1633333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.691187,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:26:17Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..yP648bZqiiY0JPBiTyC7jTMXkebCv4iqN0_tVXCF74ryqsjXdYklHHU-Ngv_h4PMivJlXosREpKB8neYQIexCw',
              },
            },
            {
              id: 'c6ab9f20-5947-4e18-b10c-5048df9e7c19',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:31:31.191Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248702_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:25:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:30:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014878,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:30:00.000Z',
                      hashId: '224784614c0f00e851057c88453ccf15',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":428.3333333333,"electrolyser.input.electricity":818.3083333333,"electrolyser.input.solar":0,"gas_purification.input.electricity":69.5833333333,"gas_purification.input.solar":0,"compression.input.electricity":15.25,"compression.input.solar":0,"compression.output.hydrogen":14.8783333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.723847,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:31:31Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..a2FxcYIbuN40IMtqbF8ham6mW1ihJbetrTPrrIDY9wI1FRkHKvvzSlo0EtLPXkWBdXRfOBRxLkoJy4Xqm1AvBw',
              },
            },
            {
              id: '1d6685ef-ec54-4525-b8a3-1034d61591a9',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:36:15.883Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248731_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:30:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:35:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014426,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:35:00.000Z',
                      hashId: '1701cca4de69b2f2013f387911e4e2a3',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.5833333333,"water_treatment.input.water":413.1666666667,"electrolyser.input.electricity":793.4208333333,"electrolyser.input.solar":0,"gas_purification.input.electricity":68.0833333333,"gas_purification.input.solar":0,"compression.input.solar":0,"compression.input.electricity":15.1666666667,"compression.output.hydrogen":14.4258333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.702603,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:36:15Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..uMmGhVhywi5OO2dits30boOZ5IGAOj7tXh8PHlH_QcLQ7Rz26pCncjEl-MdMn5mNp3IADi_6376XRQuMdgCgAw',
              },
            },
            {
              id: 'b908c9e3-cf4b-4920-a480-0c1180fa232b',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:41:47.389Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248759_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:35:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01473,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:40:00.000Z',
                      hashId: '7363b79a19bd264e231c89581ec9e804',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.75,"water_treatment.input.water":424.9166666667,"electrolyser.input.electricity":810.15,"electrolyser.input.solar":0,"gas_purification.input.electricity":68.75,"gas_purification.input.solar":0,"compression.input.electricity":15.75,"compression.input.solar":0,"compression.output.hydrogen":14.73}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.71712,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:41:47Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..yHFUw0fIbzaL8I46pogFU6efeOZVkExdKoCYjzghhaaBuWERPlXdxJj-JHCkqnyKclcpIu87Hjt5y7dVeS08Dw',
              },
            },
            {
              id: 'b4719b95-f351-4e70-af2e-c42d72d4750a',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:46:25.095Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248786_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:40:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013758,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:45:00.000Z',
                      hashId: 'd0c594f60e8bc1f10100bf91fcaa3e24',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":433.5833333333,"electrolyser.input.electricity":756.6625,"electrolyser.input.solar":0,"gas_purification.input.solar":0,"gas_purification.input.electricity":72.25,"compression.input.solar":0,"compression.input.electricity":14.5,"compression.output.hydrogen":13.7575}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.676063,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:46:25Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..lI1VNq0k1gO8H5Xwf5jJn9PUnzowhw-N-DnE88QPFCUAouRMfsNO_16Wx5VeWkzFfleEGk-EQg8_5nvBMnr5DQ',
              },
            },
            {
              id: '0a5388bd-309c-43e6-b701-80d58d739ae0',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:52:01.770Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248815_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:45:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013789,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:50:00.000Z',
                      hashId: 'ab866eaae96d904aa5bcb9e429a4a484',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":439.6666666667,"electrolyser.input.electricity":758.4041666667,"electrolyser.input.solar":0,"gas_purification.input.electricity":69,"gas_purification.input.solar":0,"compression.input.electricity":15.4166666667,"compression.input.solar":0,"compression.output.hydrogen":13.7891666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.67559,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:52:01Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ovb54isQhYN7dg8J-Xz-XOO1NqMZjl3cQj6-hECmljq8VIAFFsGgj6J1DQlwRlDh1_qkq-bVjTwjCwI1UaUjBQ',
              },
            },
            {
              id: 'cf9306ce-65ff-4c5d-8be2-4456b708fa49',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T09:56:40.807Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248841_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:50:00.000Z',
                  intervalEndDateTime: '2022-11-14T09:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01458,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T09:55:00.000Z',
                      hashId: 'f06ef5ea6a7bb08b20efd9112bdf4031',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.electricity":801.9,"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":446.0833333333,"electrolyser.input.solar":0,"gas_purification.input.electricity":68.25,"gas_purification.input.solar":0,"compression.input.electricity":14.8333333333,"compression.input.solar":0,"compression.output.hydrogen":14.58}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.70932,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T09:56:40Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..EnqADcwd8rlCURV8Uzcct07yuNNMlIgzDBd5YOiABYjIGvSF2rSOQEoyuILevmtJOj_x_GPZEAs0cxWcsyriCA',
              },
            },
            {
              id: '85747b4f-90e5-4941-8e60-b98062d5c08b',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T10:01:40.601Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248873_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T09:55:00.000Z',
                  intervalEndDateTime: '2022-11-14T10:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014506,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T10:00:00.000Z',
                      hashId: '60506877e3a29cb0232cb3beef8d38ce',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"water_treatment.input.water":408,"electrolyser.input.electricity":797.8208333333,"compression.input.solar":0,"electrolyser.input.solar":0,"compression.input.electricity":15.6666666667,"gas_purification.input.solar":0,"gas_purification.input.electricity":74.5833333333,"compression.output.hydrogen":14.5058333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.71179,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T10:01:40Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..FDNLppbgx_BWHFvvBPXnw3Tr_SkIw2Zje9TUnsiC6Nalk5in9C4irnB9E2CY7wleQR9i7V5siH9hAfrF4-SPBQ',
              },
            },
            {
              id: '5f682c28-c6e4-4353-a67a-44b65dbf9660',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T10:06:27.594Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248898_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T10:00:00.000Z',
                  intervalEndDateTime: '2022-11-14T10:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01407,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T10:05:00.000Z',
                      hashId: '75be33102ce072dc4709b5374314c5bd',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":441.75,"water_treatment.input.electricity":1.5833333333,"electrolyser.input.electricity":773.85,"electrolyser.input.solar":0,"gas_purification.input.electricity":71.6666666667,"gas_purification.input.solar":0,"compression.input.solar":0,"compression.input.electricity":15.75,"compression.output.hydrogen":14.07}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.69028,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T10:06:27Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..dS2RzKjMtyCRVovaQkRUsqO_54gEWyaVs8UY_1qCeybfGvJWBCzb4JFc0p9apTzxvGQ8-bvgi4UJNn27GM0yCg',
              },
            },
            {
              id: 'b65d0ac9-3c2b-4061-9f0f-e345818e0a83',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T10:11:20.884Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248927_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T10:05:00.000Z',
                  intervalEndDateTime: '2022-11-14T10:10:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014263,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T10:10:00.000Z',
                      hashId: '4a420083c4a258e34d052edcdd05c16e',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":412.9166666667,"water_treatment.input.electricity":1.75,"electrolyser.input.electricity":784.4375,"electrolyser.input.solar":0,"gas_purification.input.electricity":73.75,"gas_purification.input.solar":0,"compression.input.electricity":14.5,"compression.input.solar":0,"compression.output.hydrogen":14.2625}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.69955,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T10:11:20Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..iHnrAX-z_TtFN-WdS-CWntg5BLDOWAygKXDjMohKGQy3SbuhlZcBge100MJZRQmis9vK2hH4JQ6rFMfxHnTGCQ',
              },
            },
            {
              id: '8e6c6e1f-678c-4456-b6e6-d11f19257971',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-11-14T10:16:50.213Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4248955_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-11-14',
                  intervalStartDateTime: '2022-11-14T10:10:00.000Z',
                  intervalEndDateTime: '2022-11-14T10:15:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014445,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-carbon.reduction-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.solar-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.solar-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.solar-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.water-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.output.hydrogen-2022-11-14T10:15:00.000Z',
                      hashId: 'bc3b39ea6de25decb32c6c09d1859222',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.5833333333,"electrolyser.input.solar":0,"gas_purification.input.solar":0,"compression.input.solar":0,"electrolyser.input.electricity":794.475,"water_treatment.input.water":410.25,"gas_purification.input.electricity":73.5,"compression.input.electricity":14.9166666667,"compression.output.hydrogen":14.445}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource:
                    'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.70758,
                  CO2eqEmissionsTYMLEZ: 0,
                  emissionsUOM: 't',
                  CO2eqFormula: '$CO2Emissions',
                  CO2eqEmissionsReduction: 0,
                  CO2eqEmissionsReductionTYMLEZ: 0,
                  emissionsReductionUOM: 't',
                  CO2eqEmissionsReductionFormula: '$emissionsReductionUOM',
                  tokenOwnerId: '0.0.48461821',
                  policyId: '6333e8db4a20be40b59d4f6c',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                  ],
                  type: '6f441154-a803-4b4c-b7a5-63248bdbc32b&1.0.0',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T10:16:50Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Vy5fuMnA61Xo44e-jPczyTtnq-TLryj8vqOAKezLOYd02_01NDDvY0QEm_hlJK474XjZRLJiNuhbZ5xSDUz0Dw',
              },
            },
          ],
          deviceName: 'hydrogen-plant',
        },
        {
          deviceId: 'MintToken',
          vc: [
            {
              id: 'a98c6ff0-1e8c-423f-bda7-5a858cdc22ce',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
              issuanceDate: '2022-11-14T10:16:58.056Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  date: '2022-11-14T10:16:58.049Z',
                  tokenId: '0.0.48461802',
                  amount: '1.01',
                  '@context': [
                    'https://ipfs.io/ipfs/bafkreib67gunqam5jcv6xx3ioapfzyrnvte5wvpmcq56emso5acckercae',
                  ],
                  type: 'MintToken',
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2022-11-14T10:16:58Z',
                verificationMethod:
                  'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..4BY3njVfPxpAg4yEef2PmrW9aPAgjBISS4cBHM_kZ_1o7ofxtHnrEC1Zq7aMsqvgS4fUnJ3nfXNeU7ShTtS7DA',
              },
            },
          ],
          deviceName: 'MintToken',
        },
      ],
      proof: {
        type: 'Ed25519Signature2018',
        created: '2022-11-14T10:17:02Z',
        verificationMethod:
          'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797#did-root-key',
        proofPurpose: 'authentication',
        challenge: '123',
        jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..CurlY-7nAy6FzaT8K2fKRFAVUYnsID8b8yMTI-kv50X-jlDiacwyP1oak9ypC8qpfoscWrNi7NHdv6HUCwLEDQ',
      },
    },
    cachedTimestamp: '2022-11-18T01:30:30.996Z',
    topicId: '0.0.48461813',
    hashId: '2f6caba616b928d1c0b06ed6b19fa14b',
    topicMessages: [
      {
        id: '593d39ff-94dc-4668-89e2-cae77faac2c3',
        status: 'ISSUE',
        type: 'Topic',
        action: 'create-topic',
        lang: 'en-US',
        name: 'Tymlez GOO',
        description: 'Tymlez Policy to guarantee of Origin',
        owner:
          'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
        messageType: 'INSTANCE_POLICY_TOPIC',
        childId: null,
        parentId: '0.0.48461806',
        rationale: '1664346612.474140003',
      },
      {
        id: '391c9f37-11e5-48f6-9f13-d44668ca3872',
        status: 'ISSUE',
        type: 'DID-Document',
        action: 'create-did-document',
        lang: 'en-US',
        did: 'did:hedera:testnet:HMWXmUUwFFHh5LdcnFHECJsvm8JrW4TMeXsKkS7jeC5p;hedera:testnet:tid=0.0.48461813',
        cid: 'bafkreiau3b6ol65ouvn6ffvp767xr7fl4zyjne6l5wgmfaca5ufwmfkave',
        url: 'https://ipfs.io/ipfs/bafkreiau3b6ol65ouvn6ffvp767xr7fl4zyjne6l5wgmfaca5ufwmfkave',
        ipfsDocument: {
          '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://ns.did.ai/transmute/v1',
          ],
          id: 'did:hedera:testnet:HMWXmUUwFFHh5LdcnFHECJsvm8JrW4TMeXsKkS7jeC5p;hedera:testnet:tid=0.0.48461813',
          verificationMethod: [
            {
              id: 'did:hedera:testnet:HMWXmUUwFFHh5LdcnFHECJsvm8JrW4TMeXsKkS7jeC5p;hedera:testnet:tid=0.0.48461813#did-root-key',
              type: 'Ed25519VerificationKey2018',
              controller:
                'did:hedera:testnet:HMWXmUUwFFHh5LdcnFHECJsvm8JrW4TMeXsKkS7jeC5p;hedera:testnet:tid=0.0.48461813',
              publicKeyBase58: 'ARYCPt7HzpccpnNJMnGH4U6XphLsF8YXaUDwyE39HhzW',
            },
          ],
          authentication:
            'did:hedera:testnet:HMWXmUUwFFHh5LdcnFHECJsvm8JrW4TMeXsKkS7jeC5p;hedera:testnet:tid=0.0.48461813#did-root-key',
          assertionMethod: ['#did-root-key'],
        },
      },
      {
        id: '2500dcf0-56d5-4c85-b2ee-2e9fd96185c4',
        status: 'ISSUE',
        type: 'VC-Document',
        action: 'create-vc-document',
        lang: 'en-US',
        issuer:
          'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
        relationships: null,
        cid: 'bafkreigysgi5omh667i4aqwxoe6gjjx3pf3rpl5y4rhhfgsnruya2lqzwm',
        url: 'https://ipfs.io/ipfs/bafkreigysgi5omh667i4aqwxoe6gjjx3pf3rpl5y4rhhfgsnruya2lqzwm',
        documentStatus: 'NEW',
        ipfsDocument: {
          id: 'ba0ecf33-cd7a-4f0d-b429-964d8bf7e328',
          type: ['VerifiableCredential'],
          issuer:
            'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
          issuanceDate: '2022-09-28T06:44:11.542Z',
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          credentialSubject: [
            {
              projectId: '2cc1883c-74ff-4b17-be6f-c132e7efeb6b',
              projectName: 'Green Hydrogen Demo',
              projectDescription: 'Green Hydrogen Demo',
              projectType: 'GHG emission reductions from fuel combustion',
              country: 'AUS',
              standard: 'TYMLEZ',
              standardProjectId: '2cc1883c-74ff-4b17-be6f-c132e7efeb6b',
              plannedUNSDGImpacts: '',
              policyId: '6333e8db4a20be40b59d4f6c',
              '@context': [
                'https://ipfs.io/ipfs/bafkreieeha5facxbkkfbp6atf5efqzazllmvrrs6az5rwipdha2nq2gdxm',
              ],
              id: 'did:hedera:testnet:HMWXmUUwFFHh5LdcnFHECJsvm8JrW4TMeXsKkS7jeC5p;hedera:testnet:tid=0.0.48461813',
              type: 'e18af405-3773-49a6-bb94-de1d45b2cbf0&1.0.0',
            },
          ],
          proof: {
            type: 'Ed25519Signature2018',
            created: '2022-09-28T06:44:11Z',
            verificationMethod:
              'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797#did-root-key',
            proofPurpose: 'assertionMethod',
            jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..lGpcpfhmnWCxPUgNZsdlIJ7t3yOQEQANbjE39ozop9e5XWTY4gPpETRncuAi0PTKpob16vLPJXDnqzbSfi6WDg',
          },
        },
      },
      {
        id: '7cce055c-fb52-4a05-b331-8c4633470323',
        status: 'ISSUE',
        type: 'DID-Document',
        action: 'create-did-document',
        lang: 'en-US',
        did: 'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813',
        cid: 'bafkreibetglhhr26l7cuzeqvsatme2kgs4cucb4ktxacoeucjykfwfuzzy',
        url: 'https://ipfs.io/ipfs/bafkreibetglhhr26l7cuzeqvsatme2kgs4cucb4ktxacoeucjykfwfuzzy',
        ipfsDocument: {
          '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://ns.did.ai/transmute/v1',
          ],
          id: 'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813',
          verificationMethod: [
            {
              id: 'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813#did-root-key',
              type: 'Ed25519VerificationKey2018',
              controller:
                'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813',
              publicKeyBase58: '2VcCn64EcBdNAJamDk7sXCs34zqmPHvKZFpmJtUYBDg1',
            },
          ],
          authentication:
            'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813#did-root-key',
          assertionMethod: ['#did-root-key'],
        },
      },
      {
        id: '4cf394ae-4385-4cd9-81c7-640738d7ef92',
        status: 'ISSUE',
        type: 'VC-Document',
        action: 'create-vc-document',
        lang: 'en-US',
        issuer:
          'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
        relationships: null,
        cid: 'bafkreibbnaefwxwizuu56l7khclehaacipwpqikci6fcw6edydrdlbxjvm',
        url: 'https://ipfs.io/ipfs/bafkreibbnaefwxwizuu56l7khclehaacipwpqikci6fcw6edydrdlbxjvm',
        documentStatus: 'NEW',
        ipfsDocument: {
          id: 'ab72a1e3-f495-4910-a77b-6f37011c3208',
          type: ['VerifiableCredential'],
          issuer:
            'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797',
          issuanceDate: '2022-09-28T06:46:49.894Z',
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          credentialSubject: [
            {
              siteId: 'd5b09664-017d-422c-9813-ee9167bae705',
              siteName: 'Green Hydrogen Demo Site',
              projectId:
                'did:hedera:testnet:AyqQ5wGhEmgArx5F4ijSTvDJ9YaB3HrUcApJjvZ1Xc1S;hedera:testnet:tid=0.0.48461812',
              GPSLocation: '153.3864630515758--27.962306855423336',
              policyId: '6333e8db4a20be40b59d4f6c',
              '@context': [
                'https://ipfs.io/ipfs/bafkreigwcswgetuvrleul22ty6wwbsljc7jqb3x2enbsfcous3kisuba64',
              ],
              id: 'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813',
              type: 'c105e171-9ea8-42d6-a29d-4c3a6a1f453c&1.0.0',
            },
          ],
          proof: {
            type: 'Ed25519Signature2018',
            created: '2022-09-28T06:46:49Z',
            verificationMethod:
              'did:hedera:testnet:E338mr7phy3NfaoQpcNsySNNZSAHP5VqyToGjoqd3Ppr;hedera:testnet:tid=0.0.48461797#did-root-key',
            proofPurpose: 'assertionMethod',
            jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ibvEGZr4SJ5Q1KQs8OIkAP2NX_wU4b505nHYsl0cF9KS0F0LBFSAGl1XXrGXXbYS2ndBrEoXtRYGbM_PUJ5JCQ',
          },
        },
      },
      {
        id: '825616c4-7e80-4252-9bf9-bd58e66638a4',
        status: 'ISSUE',
        type: 'VC-Document',
        action: 'create-vc-document',
        lang: 'en-US',
        issuer:
          'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
        cid: 'bafkreihfpubezb5m2s5d3o7ta22netzrkhibuiu3tif5osbt3fkynidxtu',
        url: 'https://ipfs.io/ipfs/bafkreihfpubezb5m2s5d3o7ta22netzrkhibuiu3tif5osbt3fkynidxtu',
        ipfsDocument: {
          id: '346c46cc-3463-465e-a9e8-1c96d8d2b1d7',
          type: ['VerifiableCredential'],
          issuer:
            'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
          issuanceDate: '2022-09-28T06:48:25.253Z',
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          credentialSubject: [
            {
              role: 'INSTALLER',
              userId:
                'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
              policyId: '6333e8db4a20be40b59d4f6c',
              groupOwner:
                'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
              groupName: 'INSTALLER',
              '@context': [
                'https://ipfs.io/ipfs/bafkreicrztufp6ixuyhh4caqu7bfitqj3idf4ne7l5ytewbkdb5z4topne',
              ],
              id: '1cf67d41-e079-400b-bbb9-eb94e16b9c11',
              type: 'UserRole',
            },
          ],
          proof: {
            type: 'Ed25519Signature2018',
            created: '2022-09-28T06:48:25Z',
            verificationMethod:
              'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797#did-root-key',
            proofPurpose: 'assertionMethod',
            jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..IIUThaIyW5QbPPe_BqzWyKB02Y05oYlZpvRcB30VtKd3uUui_cId6A02u7IVFxlH-yr0faRxNDuVuChsfrj0Dw',
          },
        },
      },
      {
        id: '8c84b1c3-0cc9-4c08-bbc7-9ec22e7f7f15',
        status: 'ISSUE',
        type: 'DID-Document',
        action: 'create-did-document',
        lang: 'en-US',
        did: 'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
        cid: 'bafkreidh7co7uxtdn3ckso3sfufmexsrzdxznwlqljjefdraciypfw52z4',
        url: 'https://ipfs.io/ipfs/bafkreidh7co7uxtdn3ckso3sfufmexsrzdxznwlqljjefdraciypfw52z4',
        ipfsDocument: {
          '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://ns.did.ai/transmute/v1',
          ],
          id: 'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
          verificationMethod: [
            {
              id: 'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
              type: 'Ed25519VerificationKey2018',
              controller:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              publicKeyBase58: '9VK6xKBe5i1XJLCZBBTVQimrbpnD1rjqp2sBgNZNcEC9',
            },
          ],
          authentication:
            'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
          assertionMethod: ['#did-root-key'],
        },
      },
      {
        id: 'f42b9856-b8aa-4cb0-95b6-de5f641656c0',
        status: 'ISSUE',
        type: 'VC-Document',
        action: 'create-vc-document',
        lang: 'en-US',
        issuer:
          'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
        relationships: null,
        cid: 'bafkreiasmqqxwnvoo6trxw4nueecdlnylicszxsyuendb3rbq7d5hhtlzi',
        url: 'https://ipfs.io/ipfs/bafkreiasmqqxwnvoo6trxw4nueecdlnylicszxsyuendb3rbq7d5hhtlzi',
        documentStatus: 'Waiting for assign to site',
        ipfsDocument: {
          id: '459ea8f5-22a8-49bf-8c2f-b83005f39df6',
          type: ['VerifiableCredential'],
          issuer:
            'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
          issuanceDate: '2022-09-28T06:49:14.239Z',
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          credentialSubject: [
            {
              siteId: 'd5b09664-017d-422c-9813-ee9167bae705',
              certification:
                'https://ipfs.io/ipfs/bafkreifxvoivmur2vo7zya7mvwiburlxsosnkwsi4agkpn3z546fozg6zq',
              deviceId: 'Device-01',
              deviceType: 'PLANT HISTORIAN SYSTEM',
              deviceName: 'hydrogen-plant',
              make: '',
              model: '',
              serialNumber: '',
              certificationExpiryDate: '2027-09-08',
              policyId: '6333e8db4a20be40b59d4f6c',
              '@context': [
                'https://ipfs.io/ipfs/bafkreibfxwqmmuzrxudv5gwccm2r5sxjf33kloo7n6cvk5mzse3cniwg74',
              ],
              id: 'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              type: 'd7d22637-d8be-47ec-bd8c-938226841489&1.0.0',
            },
          ],
          proof: {
            type: 'Ed25519Signature2018',
            created: '2022-09-28T06:49:14Z',
            verificationMethod:
              'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797#did-root-key',
            proofPurpose: 'assertionMethod',
            jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..VcPjk_pG_vLSi0GzvSxFvs_GvIR4vW0szQiLqWmeL1z4OTg9d3ZUI7WgTwezmnv2RHaJoTKjv07wEfcwFMoABA',
          },
        },
      },
      {
        id: '35140f65-43ec-4b0a-8d16-d37ba7d069a5',
        status: 'ISSUE',
        type: 'VC-Document',
        action: 'create-vc-document',
        lang: 'en-US',
        issuer:
          'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
        relationships: null,
        cid: 'bafkreihfzzycnpc5urdiewb77oy3xob2qbtirc7aozzogvuzslxsyingw4',
        url: 'https://ipfs.io/ipfs/bafkreihfzzycnpc5urdiewb77oy3xob2qbtirc7aozzogvuzslxsyingw4',
        documentStatus: 'Assigned to site',
        ipfsDocument: {
          id: '459ea8f5-22a8-49bf-8c2f-b83005f39df6',
          type: ['VerifiableCredential'],
          issuer:
            'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797',
          issuanceDate: '2022-09-28T06:49:14.239Z',
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          credentialSubject: [
            {
              siteId:
                'did:hedera:testnet:2yTYB1WbKPgf5bMUP1njnujwLouAZ9sNXMXxix9Kdnxh;hedera:testnet:tid=0.0.48461813',
              certification:
                'https://ipfs.io/ipfs/bafkreifxvoivmur2vo7zya7mvwiburlxsosnkwsi4agkpn3z546fozg6zq',
              deviceId: 'Device-01',
              deviceType: 'PLANT HISTORIAN SYSTEM',
              deviceName: 'hydrogen-plant',
              make: '',
              model: '',
              serialNumber: '',
              certificationExpiryDate: '2027-09-08',
              policyId: '6333e8db4a20be40b59d4f6c',
              '@context': [
                'https://ipfs.io/ipfs/bafkreibfxwqmmuzrxudv5gwccm2r5sxjf33kloo7n6cvk5mzse3cniwg74',
              ],
              id: 'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              type: 'd7d22637-d8be-47ec-bd8c-938226841489&1.0.0',
            },
          ],
          proof: {
            type: 'Ed25519Signature2018',
            created: '2022-09-28T06:49:14Z',
            verificationMethod:
              'did:hedera:testnet:J5dCHNDohKC5h2v8QsFEif7h6vv4BLJJLpQrtv2EL7hq;hedera:testnet:tid=0.0.48461797#did-root-key',
            proofPurpose: 'assertionMethod',
            jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..VcPjk_pG_vLSi0GzvSxFvs_GvIR4vW0szQiLqWmeL1z4OTg9d3ZUI7WgTwezmnv2RHaJoTKjv07wEfcwFMoABA',
          },
        },
      },
    ],
  },
};
