import { Controller, Post, Body, Req } from '@nestjs/common';
import {
  CreateOneVehicleInputDto,
  CreateOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from 'src';
import { Throttle } from '@nestjs/throttler';
import { ICreateOneVehicleUsecase } from 'src/domain/vehicle/interfaces';

@Controller('vehicle')
@ApiTags('Vehicle')
export class CreateOneVehicleController extends AppController {
  constructor(
    private readonly createOneVehicleUsecase: ICreateOneVehicleUsecase,
  ) {
    super();
  }

  @Post('create-one')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Creates one single vehicle.',
  })
  public async handler(
    @Body()
    createOneVehicleInputDto: CreateOneVehicleInputDto,
  ): Promise<CreateOneVehicleOutputDto> {
    return this.createOneVehicleUsecase.execute(createOneVehicleInputDto);
  }
}
