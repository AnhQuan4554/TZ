import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();

const {
  PORT = 3010,
  MONGO_DB_CONNECTION = '',
  GUARDIAN_TYMLEZ_API_KEY = '',
  GUARDIAN_API_GW_URL = '',
  MQ_ADDRESS,
  GUARDIAN_MONGO_DB_CONNECTION = '',
} = process.env;

assert(
  GUARDIAN_MONGO_DB_CONNECTION,
  `GUARDIAN_MONGO_DB_CONNECTION is missing in environment variables`,
);
assert(
  MONGO_DB_CONNECTION,
  `MONGO_DB_CONNECTION is missing in environment variables`,
);
assert(
  GUARDIAN_API_GW_URL,
  `GUARDIAN_API_GW_URL is missing in environment variables`,
);
assert(
  GUARDIAN_TYMLEZ_API_KEY,
  `GUARDIAN_TYMLEZ_API_KEY is missing in environment variables`,
);

export {
  PORT,
  MQ_ADDRESS,
  GUARDIAN_MONGO_DB_CONNECTION,
  MONGO_DB_CONNECTION,
  GUARDIAN_API_GW_URL,
  GUARDIAN_TYMLEZ_API_KEY,
};
