export type AuthConfig = {
  secret_key: string;
  expires_time: string;
  refreshSecret: string;
  refreshExpires: string;
  confirmEmailSecret: string;
  confirmEmailExpires: string;
};
