import {
  DeleteOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';

export abstract class IDeleteOneVehicleUsecase {
  abstract execute(
    id: string,
  ): Promise<DeleteOneVehicleOutputDto>;
}
