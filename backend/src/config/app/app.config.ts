import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import validateConfig from '../../utils/validate-config';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsString()
  @IsOptional()
  FRONTEND_URL: string;

  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    app_name: process.env.APP_NAME || 'app',
    fe_url: process.env.FRONTEND_URL || 'app',
    api_Prefix: process.env.API_PREFIX,
    app_port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    database_port:
      process.env.NODE_ENV === 'development'
        ? +process.env.DEV_DATABASE_PORT
        : +process.env.DATABASE_PORT,
    database_username:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_DATABASE_USERNAME
        : process.env.DATABASE_USERNAME,
    database_password:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_DATABASE_PASSWORD
        : process.env.DATABASE_PASSWORD,
    database_name:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_DATABASE_NAME
        : process.env.DATABASE_NAME,
    database_host:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_DATABASE_HOST
        : process.env.DATABASE_HOST,
    workingDirectory: process.env.PWD || process.cwd(),
  };
});
