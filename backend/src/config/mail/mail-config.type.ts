export type MailConfig = {
  mail_port: number;
  host?: string;
  user?: string;
  password?: string;
  default_email?: string;
  defaultName?: string;
  //   secure options:
  //   ignoreTLS: boolean;
  // secure: boolean;
  //   requireTLS: boolean;
};
