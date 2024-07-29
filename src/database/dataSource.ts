import { PrismaServiceOptions } from 'nestjs-prisma';
import configApp from 'src/config';

const AppDataSource: PrismaServiceOptions = {
  prismaOptions: {
    datasourceUrl: `postgresql://${configApp.DATABASE_USERNAME}:${configApp.DATABASE_PASSWORD}@${configApp.DATABASE_HOST}:${configApp.DATABASE_PORT}/${configApp.DATABASE_NAME}?schema=public`,
  },
};

export default AppDataSource;
