import dotenv from 'dotenv';

const env = dotenv.config({ debug: true });

if (env.error) {
  throw env.error;
}

const config = env.parsed;

export default config;
