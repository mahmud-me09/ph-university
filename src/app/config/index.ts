import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  bycryptSalt: process.env.BCRYPT_SALT_ROUNDS,
  defaultPasswordForUser: process.env.DEFAULT_PASS_FOR_USER,
  nodeEnvironment:process.env.NODE_ENV
};
