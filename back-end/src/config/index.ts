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
};

export default ENV;
