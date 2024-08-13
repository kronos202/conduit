import { AuthConfig } from 'src/config/auth/auth-config.types';
import { AppConfig } from './app/app-config.type';
import { MailConfig } from './mail/mail-config.type';
import { GoogleConfig } from './google/google-config.type';

type AllConfigType = {
  auth: AuthConfig;
  app: AppConfig;
  mail: MailConfig;
  google: GoogleConfig;
};

export default AllConfigType;
