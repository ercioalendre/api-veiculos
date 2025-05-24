import { Module } from '@nestjs/common';
import { VehicleModule } from 'src/domain/vehicle';

@Module({
  imports: [VehicleModule],
  providers: [],
  exports: [],
  controllers: [],
})
export class DomainModule {}
