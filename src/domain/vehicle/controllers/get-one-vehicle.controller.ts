import { Controller, Get, Param } from '@nestjs/common';
import { GetOneVehicleOutputDto } from 'src/domain/vehicle/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from 'src';
import { IGetOneVehicleUsecase } from 'src/domain/vehicle/interfaces';

@Controller('vehicle')
@ApiTags('Vehicle')
export class GetOneVehicleController extends AppController {
  constructor(private readonly getOneVehicleUsecase: IGetOneVehicleUsecase) {
    super();
  }

  @Get('get-one/:id')
  @ApiOperation({
    summary: 'Gets one single vehicle by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<GetOneVehicleOutputDto | null> {
    return this.getOneVehicleUsecase.execute(id);
  }
}
