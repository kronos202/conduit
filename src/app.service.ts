import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.log('This is an info message');
    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message');
    return 'Hello World!';
  }
}
