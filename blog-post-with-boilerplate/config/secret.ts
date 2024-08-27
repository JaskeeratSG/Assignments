import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const ENVIRONMENT = process.env.NODE_ENV;


export const TYPEORM_CONNECTION = process.env.TYPEORM_HOST;
export const APP_VERSION = process.env.npm_package_version;
export const APP_NAME = process.env.npm_package_name;

export const JWT_SECRET = process.env.JWT_SECRET
export const {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
  TYPEORM_LOGGING,
} = process.env;
