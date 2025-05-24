import { Injectable } from '@nestjs/common';
import { GetManyVehicleOutputDto } from 'src/domain/vehicle/dtos';
import { IGetManyVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { IVehicleRepository } from 'src/shared/interfaces';

@Injectable()
export class GetManyVehicleUsecase implements IGetManyVehicleUsecase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(): Promise<GetManyVehicleOutputDto[]> {
    return await this.vehicleRepository.getMany();
  }
}
