import type { MikroORMOptions } from '@mikro-orm/core';
import { IpfsFile } from './entities/ipfs-file.entity';

export const config: Partial<MikroORMOptions> = {
  entities: [IpfsFile],
  dbName: 'guardian_extensions_db',
  clientUrl: process.env.MONGO_DB_CONNECTION,
  type: 'mongo',
  ensureIndexes: true,
};
