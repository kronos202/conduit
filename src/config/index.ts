import { AuthConfig } from 'src/domain/auth/config/auth-config.types';
import { AppConfig } from './app-config.type';

type AllConfigType = {
  auth: AuthConfig;
  app: AppConfig;
};

export default AllConfigType;
