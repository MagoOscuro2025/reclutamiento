import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  HOST: get('HOST').required().asString(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),

}