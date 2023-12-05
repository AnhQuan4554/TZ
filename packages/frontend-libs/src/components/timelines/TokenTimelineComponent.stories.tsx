import type { Meta, Story } from '@storybook/react';
import { ITokenTimelineProps, TokenTimeline } from './TokenTimeline';

const settingBlueIcon = require('../../static/setting_blue.svg') as string;
const settingGrayIcon = require('../../static/setting_gray.svg') as string;
const oClockGreenIcon = require('../../static/oclock_green.svg') as string;
const oClockGrayIcon = require('../../static/oclock_gray.svg') as string;
const repeatDatabaseGrayIcon = require('../../static/repeat_database_gray.svg') as string;
const totalTokenIcon = require('../../static/total_token.svg') as string;
const site = require('../../static/site.svg') as string;
const inputIcon = require('../../static/mrv/input.svg') as string;
const outputIcon = require('../../static/mrv/output.svg') as string;
const carbonIcon = require('../../static/mrv/carbon.svg') as string;

export default {
  title: 'components/TokenTimeline',
} as Meta<ITokenTimelineProps>;

//========================Token Timeline===============================

const data = {
  data: [
    {
      data: [
        {
          name: 'Green Hydrogen Demo',
          category: 'Project',
          time: '06:44',
          date: '2022-09-28',
          input: 'Manual',
          misc: {
            type: 'GHG Emission Reductions From Fuel Combustion',
            standard: 'TYMLEZ',
            country: 'AUS',
          },
          position: 'right',
          icon: site,
          subIcon: repeatDatabaseGrayIcon,
          color: '#FF7020',
          type: 'external',
        },
        {
          name: 'Green Hydrogen Demo Site',
          category: 'Site',
          time: '06:46',
          date: '2022-09-28',
          input: 'Manual',
          misc: {
            location: '153.3864630515758,27.962306855423336',
          },
          position: 'left',
          icon: site,
          subIcon: repeatDatabaseGrayIcon,
          color: '#FF7020',
          type: 'external',
        },
        {
          name: 'Installer',
          category: 'Installer',
          time: '06:48',
          date: '2022-09-28',
          input: 'Manual',
          misc: {},
          position: 'right',
          icon: site,
          subIcon: repeatDatabaseGrayIcon,
          color: '#FF7020',
          type: 'external',
        },
      ],
      type: 'external',
    },
    {
      data: [
        {
          name: 'Meter Installation',
          time: '06:49',
          date: '2022-09-28',
          input: 'Manual',
          position: 'right',
          misc: {
            type: 'Plant Historian System',
          },
          icon: settingBlueIcon,
          subIcon: settingGrayIcon,
          color: '#2076FF',
          type: 'meter',
        },
        {
          name: 'Hydrogen-plant',
          category: 'Device',
          date: '2022-09-28',
          position: 'center',
          icon: oClockGreenIcon,
          subIcon: oClockGrayIcon,
          color: '#29AA08',
          type: 'readings',
          meterReadings: [
            {
              id: '8061fbb5-8b0c-44ca-aaf1-0248c047f000',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T17:41:02.097Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421575_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T17:35:00.000Z',
                  intervalEndDateTime: '2022-12-05T17:40:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013844,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T17:40:00.000Z',
                      hashId: '6efef00895560a61c1a31a6f8089cf94',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"compression.input.solar":0,"electrolyser.input.solar":0,"gas_purification.input.electricity":68.9166666667,"electrolyser.input.electricity":761.4291666667,"gas_purification.input.solar":0,"water_treatment.input.water":431.5,"compression.input.electricity":14.25,"compression.output.hydrogen":13.8441666667,"compression.carbon.hydrogen":13.8441666667}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.67701,
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
                created: '2022-12-05T17:41:02Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..6brp4j4NXbQTXnqn6eA00I-DfiqSnOhafkXPB6hOjCHBakH3Av0cm2okGUcE_SHd767TF5bCMM-o-CU19KxsAQ',
              },
            },
            {
              id: '5ae0da8d-2a9e-4d3b-8d1e-c5a20a65ffda',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T17:45:51.880Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421603_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T17:40:00.000Z',
                  intervalEndDateTime: '2022-12-05T17:45:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014793,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T17:45:00.000Z',
                      hashId: 'cf7db66cc48d850de348e328a7fadfca',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.6666666667,"compression.input.solar":0,"gas_purification.input.solar":0,"gas_purification.input.electricity":69.75,"water_treatment.input.water":441.5,"electrolyser.input.solar":0,"electrolyser.input.electricity":813.6333333333,"compression.input.electricity":15.0833333333,"compression.output.hydrogen":14.7933333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.720107,
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
                created: '2022-12-05T17:45:52Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ixdqYzVZxIOXlw4I2G3nelt0AP-xjjedoUoCcJdmxQltMIQEjbXo9WxSawooAPCmEfi8qDZYXA4RQ-8Wiy09Cg',
              },
            },
            {
              id: '41d3e823-40e8-48cd-8421-03c99a525375',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T17:51:16.385Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421631_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T17:45:00.000Z',
                  intervalEndDateTime: '2022-12-05T17:50:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.013543,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T17:50:00.000Z',
                      hashId: '7042a3a55ba547d963f9ce16e12d39d8',
                    },
                  ],
                  otherMRVData:
                    '{"electrolyser.input.solar":0,"gas_purification.input.solar":0,"water_treatment.input.electricity":1.5833333333,"compression.input.solar":0,"electrolyser.input.electricity":744.8833333333,"gas_purification.input.electricity":70.75,"compression.input.electricity":14.9166666667,"water_treatment.input.water":441.4166666667,"compression.output.hydrogen":13.5433333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.665707,
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
                created: '2022-12-05T17:51:16Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..SePGRjQ9HGx-Vzdn0H3bV9dYghY-MNavPhbEZtWz_5UlRlRjThQ9zVRw52cEc5fH_xQ-PNiQzKN4m3mmiMFvBg',
              },
            },
            {
              id: '640e05a5-d405-4c44-8a41-ab0a63ab7bf7',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T17:55:46.398Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421658_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T17:50:00.000Z',
                  intervalEndDateTime: '2022-12-05T17:55:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.01412,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T17:55:00.000Z',
                      hashId: 'c69df272d294445e39c73330f28ebf9f',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.electricity":1.5833333333,"electrolyser.input.solar":0,"gas_purification.input.solar":0,"compression.input.solar":0,"electrolyser.input.electricity":776.6,"gas_purification.input.electricity":69.6666666667,"water_treatment.input.water":424.6666666667,"compression.input.electricity":15,"compression.output.hydrogen":14.12}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
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
                created: '2022-12-05T17:55:46Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..bPHpXV8w_g-fQ94JkqyTjPgXtm8rAgfr6aUIc-3ERi217WuNWwLBvq4RYkN7U8yoM2II6ikKicypVkqzT4rbAQ',
              },
            },
            {
              id: 'd7a74a8a-33ab-48f5-b6cb-72c0bbc4ed43',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T18:01:18.485Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421686_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T17:55:00.000Z',
                  intervalEndDateTime: '2022-12-05T18:00:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014816,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T18:00:00.000Z',
                      hashId: 'edd5c6401ced7f3ae42ed0f2d1901ff8',
                    },
                  ],
                  otherMRVData:
                    '{"compression.input.solar":0,"electrolyser.input.solar":0,"gas_purification.input.electricity":67.75,"compression.input.electricity":15.0833333333,"electrolyser.input.electricity":814.8708333333,"water_treatment.input.water":444,"water_treatment.input.electricity":1.75,"gas_purification.input.solar":0,"compression.output.hydrogen":14.8158333333}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.719563,
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
                created: '2022-12-05T18:01:18Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..zYeyPy8H1ab5UiPQKP_5dc3lA66I4NStzSPfa_Obvj0WSyf_ZGLgNEgfZUO9lqdVbZ2rPGF85NJyYMLCOHZ4Bg',
              },
            },
            {
              id: 'b439a0e6-c58d-45fd-9c01-dbdf51236139',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T18:06:15.473Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421714_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T18:00:00.000Z',
                  intervalEndDateTime: '2022-12-05T18:05:00.000Z',
                  intervalDuration: 300,
                  intervalDurationUOM: 's',
                  value: 0.014448,
                  valueUOM: 't',
                  quality: 'HIGH - REAL TIME IOT DEVICE READINGS',
                  sourceData: [
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T18:05:00.000Z',
                      hashId: 'f2925f8584f2a7f1c4f7b3cf10df7998',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":425.25,"gas_purification.input.electricity":74.9166666667,"electrolyser.input.electricity":794.6125,"gas_purification.input.solar":0,"compression.input.electricity":14.25,"water_treatment.input.electricity":1.5833333333,"electrolyser.input.solar":0,"compression.input.solar":0,"compression.output.hydrogen":14.4475}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.70829,
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
                created: '2022-12-05T18:06:15Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..mSAqzenffJ4cuTt75lS0QvYBg5lVAIQLCe6ApQP8PjkJMD5AHgPcQz2LCJGn2NIfpfTYHMMDOzImzpNwiCoRDw',
              },
            },
            {
              id: 'fe0d413f-1b86-45dc-8892-d21efb446463',
              type: ['VerifiableCredential'],
              issuer:
                'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
              issuanceDate: '2022-12-05T18:11:01.867Z',
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              credentialSubject: [
                {
                  readingId: '4421743_h2go-goo',
                  deviceId:
                    'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813',
                  readingDate: '2022-12-05',
                  intervalStartDateTime: '2022-12-05T18:05:00.000Z',
                  intervalEndDateTime: '2022-12-05T18:10:00.000Z',
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
                      readingId: 'h2goo-mock-carbon.reduction-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-water_treatment.input.water-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-electrolyser.input.solar-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-gas_purification.input.electricity-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-compression.input.electricity-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-water_treatment.input.electricity-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId:
                        'h2goo-mock-electrolyser.input.electricity-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.input.solar-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-gas_purification.input.solar-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                    {
                      type: '13858bc3-7446-4414-ae52-561febf49a1e&1.0.0',
                      '@context': [
                        'https://ipfs.io/ipfs/bafkreiehncpifptqk2wiazew34lqw3q4ptf7t4ybeou27niccodh5veqdy',
                      ],
                      readingId: 'h2goo-mock-compression.output.hydrogen-2022-12-05T18:10:00.000Z',
                      hashId: '91e5f598aadc784eaa46ea4e227d66c5',
                    },
                  ],
                  otherMRVData:
                    '{"water_treatment.input.water":415.1666666667,"electrolyser.input.solar":0,"gas_purification.input.electricity":70.5,"compression.input.electricity":15,"water_treatment.input.electricity":1.75,"electrolyser.input.electricity":772.75,"compression.input.solar":0,"gas_purification.input.solar":0,"compression.output.hydrogen":14.05}',
                  greenhouseGasEmissionsScope: 'Scope 1',
                  greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
                  CO2Emissions: 0,
                  CO2eqEmissions: 0.688,
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
                created: '2022-12-05T18:11:01Z',
                verificationMethod:
                  'did:hedera:testnet:ADFQKEcaMTiSuacdjP8ZuwSTESVopmcAGopzFPCEX9Nw;hedera:testnet:tid=0.0.48461813#did-root-key',
                proofPurpose: 'assertionMethod',
                jws: 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..orIHHFkY4o1t1sPflHS4ugdLAqBCPf-XWK_zVn6sjaM4YZdUDK9fmAeyJFge1XQN-Mny8385D93YzFWTM8yyBg',
              },
            },
          ],
          mrvIconsList: {
            input: {
              icon: inputIcon,
              color: '#2076FF',
            },
            output: {
              icon: outputIcon,
              color: '#29AA08',
            },
            carbon: {
              icon: carbonIcon,
              color: '#FF7020',
            },
          },
        },
      ],
      device: 'hydrogen-plant',
      type: 'device',
    },
  ],
  mintedToken: {
    amount: '1.01',
    icon: totalTokenIcon,
    name: 'Guarantee of Origin',
  },
};

const TokenTimelineTemplate: Story<ITokenTimelineProps> = (args) => <TokenTimeline {...args} />;

export const TokenTimelineComponent = TokenTimelineTemplate.bind({});
TokenTimelineComponent.args = {
  data,
};
TokenTimelineComponent.storyName = 'Token Time line ';
