import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import { SettingGroups, SettingKeys } from '@tymlez/common-libs';
import { Setting } from '../../modules/settings/entities/setting.entity';

export class SettingsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    logger.info('Running settings seeds');

    const data = [
      [
        'valueUOM',
        'kwh',
        'Default value use for sending MRV',
        SettingGroups.COMMON_MRV,
        'string',
      ],
      [
        'intervalDurationUOM',
        's',
        'Default value use for sending MRV',
        SettingGroups.COMMON_MRV,
        'string',
      ],
      [
        'quality',
        'HIGH - REAL TIME IOT DEVICE READINGS',
        'Default value use for sending MRV',
        SettingGroups.COMMON_MRV,
        'string',
      ],
      [
        'greenhouseGasEmissionsScope',
        'Scope 1',
        'Default value use for sending MRV',
        SettingGroups.CET_MRV,
        'string',
      ],
      [
        'greenhouseGasEmissionsSource',
        'DIRECT - STATIONARY COMBUSTION',
        'Default value use for sending MRV',
        SettingGroups.CET_MRV,
        'string',
      ],
      [
        'emissionsUOM',
        't',
        'Default value use for sending MRV',
        SettingGroups.CET_MRV,
        'string',
      ],
      [
        'CO2eqFormula',
        '$CO2Emissions',
        'Default value use for sending MRV',
        SettingGroups.CET_MRV,
        'string',
      ],
      [
        'emissionsReductionUOM',
        't',
        'Default value use for sending CRU MRV',
        SettingGroups.CRU_MRV,
        'string',
      ],

      [
        'CO2eqEmissionsReductionFormula',
        '$emissionsReductionUOM',
        'Default value use for sending MRV',
        SettingGroups.CRU_MRV,
        'string',
      ],

      [
        'valueUOM',
        't',
        'Default value use for sending GOO MRV',
        SettingGroups.GOO_MRV,
        'string',
      ],

      // CET reading & carbon
      [
        SettingKeys.READING_METRIC_NAME,
        'eRealPositiveKwh',
        'The metric name to get all reading for CET MRV',
        SettingGroups.CET_POLICY,
        'string',
      ],

      [
        SettingKeys.CARBON_EMISSION_METRIC_NAME,
        'officialCarbon',
        'The metric name to get carbon data for CET MRV',
        SettingGroups.CET_POLICY,
        'string',
      ],

      // CET reading & carbon

      [
        SettingKeys.READING_METRIC_NAME,
        'TBD',
        'The metric name to get all reading for CRU MRV',
        SettingGroups.CRU_POLICY,
        'string',
      ],

      [
        SettingKeys.CARBON_REDUSSION_METRIC_NAME,
        'officialCarbon',
        'The metric name to get carbon reduction data for CRU MRV',
        SettingGroups.CRU_POLICY,
        'string',
      ],

      // GOO reading & carbon

      [
        SettingKeys.READING_METRIC_NAME,
        'TBD',
        'The metric name to get all reading for GOO MRV',
        SettingGroups.GOO_POLICY,
        'string',
      ],

      [
        SettingKeys.CARBON_EMISSION_METRIC_NAME,
        'TBD',
        'The metric name to get carbon emission for GOO MRV',
        SettingGroups.GOO_POLICY,
        'string',
      ],

      [
        SettingKeys.CARBON_REDUSSION_METRIC_NAME,
        'TBD',
        'The metric name to get all reduction for GOO MRV',
        SettingGroups.GOO_POLICY,
        'string',
      ],

      [
        SettingKeys.CARBON_EMISSION_METRIC_NAME,
        'officialCarbon',
        'The metric name to get carbon data for GOO MRV',
        SettingGroups.GOO_POLICY,
        'string',
      ],

      [
        SettingKeys.GUARDIAN_TENANCY_NAME,
        `${process.env.ENV}-${process.env.CLIENT_NAME}`,
        'Default value use for sending guardian',
        SettingGroups.Platform,
        'string',
      ],
      [
        SettingKeys.TOKEN_MINT_VALUE,
        '1',
        'Default value use for sending guardian',
        SettingGroups.Platform,
        'number',
      ],
      [
        SettingKeys.TRUSTCHAIN_DEFAULT_ACCOUNT,
        '0.0.6541',
        'Default account value of Hedera Account',
        SettingGroups.TrustChain,
        'string',
      ],
      [
        SettingKeys.TRUSTCHAIN_DEFAULT_NETWORK,
        'testnet',
        'Default network value of Hedera Account',
        SettingGroups.TrustChain,
        'string',
      ],
      [
        SettingKeys.TRUSTCHAIN_DEFAULT_DECRYPTIONKEY,
        '',
        'Default decryptionKey for IPFS document for tokens on Hedera Account',
        SettingGroups.TrustChain,
        'string',
      ],
      //dovu
      [
        SettingKeys.DOVU_LINK,
        'https://staging.dovu.market/partner/tymlez/embed?customerRef=customer-reference&placeholderAmount=1',
        'Link to purchase tokens on DOVU',
        SettingGroups.System,
        'string',
      ],

      [
        SettingKeys.GOO_AGGREGATION_FIELD,
        '',
        'The aggreration field use to calculate GoO verification table.',
        SettingGroups.System,
        'string',
        'true',
      ],
      [
        SettingKeys.CET_AGGREGATION_FIELD,
        '',
        'The aggreration field use to calculate CET verification table.',
        SettingGroups.System,
        'string',
        'true',
      ],
      [
        SettingKeys.CRU_AGGREGATION_FIELD,
        '',
        'The aggreration field use to calculate CRU verification table.',
        SettingGroups.System,
        'string',
        'true',
      ],
    ];

    for await (const [
      name,
      value,
      description,
      group,
      type,
      readOnly = 'false',
    ] of data) {
      const [, count] = await em.findAndCount(Setting, {
        name,
        group,
      });

      if (count === 0) {
        logger.info("Inserting setting '%s'", name);
        await em.persistAndFlush(
          em.create(Setting, {
            name,
            value,
            description,
            type,
            group: group || 'System',
            readOnly: readOnly === ' true',
          }),
        );

        logger.info("Inserted settings '%s'", name);
      } else {
        // TODO: Implement updated logic
        logger.info(
          `Skip insert settings (${name}/${group}) as it already exists`,
        );
      }
    }
  }
}
