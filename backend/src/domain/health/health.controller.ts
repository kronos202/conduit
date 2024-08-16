import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('health')
export class HealthController {
  @Get('')
  @Public()
  health() {
    return 'OK';
  }
}
