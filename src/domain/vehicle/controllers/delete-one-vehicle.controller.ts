import { Controller, Param, Delete, Req } from '@nestjs/common';
import { DeleteOneVehicleOutputDto } from 'src/domain/vehicle/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from 'src';
import { IDeleteOneVehicleUsecase } from 'src/domain/vehicle/interfaces';

@Controller('vehicle')
@ApiTags('Vehicle')
export class DeleteOneVehicleController extends AppController {
  constructor(private readonly deleteOneVehicleUsecase: IDeleteOneVehicleUsecase) {
    super();
  }

  @Delete('delete-one/:id')
  @ApiOperation({
    summary: 'Deletes one single vehicle by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<DeleteOneVehicleOutputDto> {
    return this.deleteOneVehicleUsecase.execute(id);
  }
}
