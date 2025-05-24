import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteOneVehicleOutputDto } from 'src/domain/vehicle/dtos';
import { IDeleteOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { IVehicleRepository } from 'src/shared/interfaces';

@Injectable()
export class DeleteOneVehicleUsecase implements IDeleteOneVehicleUsecase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(id: string): Promise<DeleteOneVehicleOutputDto> {
    const existingVehicle = await this.vehicleRepository.getOne({
      where: {
        id,
      },
    });

    if (!existingVehicle) {
      throw new NotFoundException(
        VehicleMessageConstant.THE_VEHICLE_YOU_ARE_TRYING_TO_DELETE_DOES_NOT_EXIST,
      );
    }

    return await this.vehicleRepository.deleteOne(id);
  }
}
