import { Controller, Get } from '@nestjs/common';
import { GetManyVehicleOutputDto } from 'src/domain/vehicle/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from 'src';
import { IGetManyVehicleUsecase } from 'src/domain/vehicle/interfaces';

@Controller('vehicle')
@ApiTags('Vehicle')
export class GetManyVehicleController extends AppController {
  constructor(private readonly getManyVehicleUsecase: IGetManyVehicleUsecase) {
    super();
  }

  @Get('get-many')
  @ApiOperation({
    summary: 'Gets many vehicle.',
  })
  public async handler(): Promise<GetManyVehicleOutputDto[]> {
    return this.getManyVehicleUsecase.execute();
  }
}
