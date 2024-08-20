import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.log('This is an info message');
    this.logger.verbose('ad');
    this.logger.debug('asd');
    return 'Hello World!';
  }
}
