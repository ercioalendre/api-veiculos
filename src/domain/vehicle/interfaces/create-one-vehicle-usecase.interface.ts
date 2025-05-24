import {
  CreateOneVehicleInputDto,
  CreateOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';

export abstract class ICreateOneVehicleUsecase {
  abstract execute(
    createOneVehicleInputDto: CreateOneVehicleInputDto,
  ): Promise<CreateOneVehicleOutputDto>;
}
