import '@babel/register';
import { config } from 'dotenv';

config();

export const development = {
  use_env_variable: 'DEV_DB_URL',
  dialect: 'postgres'
};
export const test = {
  use_env_variable: 'TEST_DB_URL',
  dialect: 'postgres'
};
export const production = {
  use_env_variable: 'PROD_DB_URL',
  dialect: 'postgres'
};
export const localDevelopment = {
  use_env_variable: 'MY_POSTICO_URL',
  dialect: 'postgres'
};
