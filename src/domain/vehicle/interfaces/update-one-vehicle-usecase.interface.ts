import {
  UpdateOneVehicleInputDto,
  UpdateOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';

export abstract class IUpdateOneVehicleUsecase {
  abstract execute(
    id: string,
    updateOneVehicleInputDto: UpdateOneVehicleInputDto,
  ): Promise<UpdateOneVehicleOutputDto>;
}
