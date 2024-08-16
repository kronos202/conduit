import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';
import AllConfigType from 'src/config';
import { getConfig } from 'src/utils/helpers/getConfig';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  private config = getConfig(this.configService);

  constructor(private configService: ConfigService<AllConfigType>) {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        datasources: {
          db: {
            url: `postgresql://${this.config.app.database_username}:${this.config.app.database_password}@${this.config.app.database_host}:${this.config.app.database_port}/${this.config.app.database_name}?schema=public`,
          },
        },
      },
      explicitConnect: true,
    };
  }
}
