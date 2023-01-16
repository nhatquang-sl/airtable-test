import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });
if (process.env.NODE_ENV?.trim() == 'development')
  dotenv.config({
    path: path.join(__dirname, '.development.env'),
    override: true,
  });

const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  APP_VERSION: process.env.APP_VERSION,
  PORT: process.env.PORT || 3500,

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',').map((x) => x.trim()) ?? [],

  DB_NAME: process.env.DB_NAME ?? '',
  DB_USERNAME: process.env.DB_USERNAME ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,

  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
};

export default ENV;
