import type { MikroORMOptions } from '@mikro-orm/core';
import assert from 'assert';
import dotenv from 'dotenv';
import { logger } from '@tymlez/backend-libs';
import { Client } from '../modules/auth/entities/client.entity';
import { User } from '../modules/auth/entities/user.entity';
import { Site } from '../modules/dashboard-site/entities/site.entity';
import { Setting } from '../modules/settings/entities/setting.entity';
import { MeterJob } from '../modules/meter-job/entities/meter-job.entity';
import { DataFlow } from '../modules/data-flow/entities/data-flow.entity';
import { DataTask } from '../modules/data-task/entities/data-task.entity';
import { MeterTask } from '../modules/meter-task/entities/meter-task.entity';
import { MeterData } from '../modules/meter-data/entities/meter-data.entity';
import { Device } from '../modules/guardian/entities/device.entity';
import { Installer } from '../modules/guardian/entities/installer.entity';
import { Meter } from '../modules/meter/entities/meter.entity';
import { GuardianSite } from '../modules/guardian/entities/site.entity';
import { Mrv } from '../modules/mrv/entities/mrv.entity';
import { Tenancy } from '../modules/tenancy/entities/tenancy.entity';
import { GuardianPolicy } from '../modules/guardian/entities/policy.entity';
import { Dovu } from '../modules/dovu/entities/dovu.entity';
import { GuardianToken } from '../modules/trustchain/entities/guardian_token.entity';
import { GuardianVpDocument } from '../modules/verification/entities/guardian-vp.entity';
import { GuardianTopic } from '../modules/trustchain/entities/guardian_topic.entity';
import { Role } from '../modules/auth/entities/role.entity';
import { TrustchainToken } from '../modules/trustchain/entities/trustchain_token.entity';
import { TrustchainMRV } from '../modules/trustchain/entities/trustchain_mrv.entity';

dotenv.config();

assert(
  process.env.DATABASE_TYPE === 'postgresql',
  `Unexpected DATABASE_TYPE: ${process.env.DATABASE_TYPE}`,
);

const config: Partial<MikroORMOptions> = {
  // Because we use webpack, we cannot use dynamic entities discovery
  // Refer to https://mikro-orm.io/docs/deployment

  // entities: ['./dist/src/**/*.entity.js'],
  // entitiesTs: ['./src/**/*.entity.ts'],
  discovery: { disableDynamicFileAccess: true },
  entities: [
    Client,
    User,
    Role,
    Site,
    Meter,
    Installer,
    Setting,
    MeterJob,
    DataFlow,
    DataTask,
    Device,
    MeterTask,
    MeterData,
    GuardianSite,
    Mrv,
    Tenancy,
    GuardianPolicy,
    Dovu,
    GuardianToken,
    GuardianVpDocument,
    GuardianTopic,
    TrustchainToken,
    TrustchainMRV,
  ],
  forceUtcTimezone: true,
  allowGlobalContext: false,
  dbName: process.env.DATABASE_NAME,
  type: process.env.DATABASE_TYPE,
  clientUrl: process.env.DATABASE_URL,
  tsNode: true,
  migrations: {
    tableName: 'platform_mikro_migrations',
    path: './dist/db/migrations/',
    // pathTs: './dist/db/migrations/',
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts),
    dropTables: false,
    emit: 'ts',
  },
  pool: {
    min: 2,
    max: 100,
  },
  seeder: {
    path: './dist/db/seeders/', // path to the folder with seeders
    // pathTs: './src/db/seeders/', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  debug: (process.env.MIKRO_ORM_DEBUG?.split(',') as any) || false,
  logger: (s) => logger.info(s),
};

export default config;
