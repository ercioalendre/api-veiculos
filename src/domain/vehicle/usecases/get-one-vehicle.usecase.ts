import { Injectable, NotFoundException } from '@nestjs/common';
import { GetOneVehicleOutputDto } from 'src/domain/vehicle/dtos';
import { IGetOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { IVehicleRepository } from 'src/shared/interfaces';

@Injectable()
export class GetOneVehicleUsecase implements IGetOneVehicleUsecase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(id: string): Promise<GetOneVehicleOutputDto> {
    const existingVehicle = await this.vehicleRepository.getOne({
      where: {
        id,
      },
    });

    if (!existingVehicle) {
      throw new NotFoundException(
        VehicleMessageConstant.THE_VEHICLE_YOU_ARE_LOOKING_FOR_DOES_NOT_EXIST,
      );
    }

    return existingVehicle;
  }
}
