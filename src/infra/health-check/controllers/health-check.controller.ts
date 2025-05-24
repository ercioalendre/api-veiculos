import { Controller, Get } from '@nestjs/common';
import { AppController } from 'src';

@Controller('health-check')
export class HealthCheckController extends AppController {
  constructor() {
    super();
  }

  @Get()
  public async handler(): Promise<void> {
    return;
  }
}
