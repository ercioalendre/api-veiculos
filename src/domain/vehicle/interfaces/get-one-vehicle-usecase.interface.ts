import {
  GetOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';

export abstract class IGetOneVehicleUsecase {
  abstract execute(
    id: string,
  ): Promise<GetOneVehicleOutputDto>;
}
