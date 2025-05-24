import { Controller, Patch, Body, Req, Param } from '@nestjs/common';
import { UpdateOneVehicleInputDto } from 'src/domain/vehicle/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from 'src';
import { Throttle } from '@nestjs/throttler';
import { IUpdateOneVehicleUsecase } from 'src/domain/vehicle/interfaces';

@Controller('vehicle')
@ApiTags('Cash Register')
export class UpdateOneVehicleController extends AppController {
  constructor(private readonly updateVehicleUsecase: IUpdateOneVehicleUsecase) {
    super();
  }

  @Patch('update-one/:id')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Updates one single vehicle.',
  })
  public async handler(
    @Param('id') id: string,
    @Body()
    updateVehicleInputDto: UpdateOneVehicleInputDto,
  ) {
    return this.updateVehicleUsecase.execute(id, updateVehicleInputDto);
  }
}
