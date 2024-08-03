import { AuthConfig } from 'src/config/auth/auth-config.types';
import { AppConfig } from './app/app-config.type';

type AllConfigType = {
  auth: AuthConfig;
  app: AppConfig;
};

export default AllConfigType;
