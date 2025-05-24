import {
  GetManyVehicleOutputDto,
} from 'src/domain/vehicle/dtos';

export abstract class IGetManyVehicleUsecase {
  abstract execute(): Promise<GetManyVehicleOutputDto[]>;
}
