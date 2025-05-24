import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UpdateOneVehicleInputDto,
  UpdateOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';
import { IVehicleRepository } from 'src/shared/interfaces';
import { IUpdateOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { validateRenavam } from 'src/shared/utils';

@Injectable()
export class UpdateOneVehicleUsecase implements IUpdateOneVehicleUsecase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(
    id: string,
    updateOneVehicleInputDto: UpdateOneVehicleInputDto,
  ): Promise<UpdateOneVehicleOutputDto> {
    const { licensePlate, chassi, renavam } = updateOneVehicleInputDto;

    const existingVehicleToUpdate = await this.vehicleRepository.getOne({
      where: {
        id,
      },
    });

    if (!existingVehicleToUpdate) {
      throw new NotFoundException(
        VehicleMessageConstant.THE_VEHICLE_YOU_ARE_TRYING_TO_UPDATE_DOES_NOT_EXIST,
      );
    }

    const anotherExistingVehicle = await this.vehicleRepository.getOne({
      where: {
        id: {
          not: id,
        },
        OR: [
          {
            licensePlate,
          },
          {
            chassi,
          },
          {
            renavam,
          },
        ],
      },
    });

    if (anotherExistingVehicle) {
      if (anotherExistingVehicle.licensePlate === licensePlate) {
        throw new ConflictException(
          VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
            'licensePlate',
          ),
        );
      } else if (anotherExistingVehicle.chassi === chassi) {
        throw new ConflictException(
          VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
            'chassi',
          ),
        );
      } else if (anotherExistingVehicle.renavam === renavam) {
        throw new ConflictException(
          VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
            'renavam',
          ),
        );
      }
    }

    let normalizedRenavam: string;

    if (renavam) {
      if (!validateRenavam(renavam)) {
        throw new BadRequestException(
          VehicleMessageConstant.THE_RENAVAM_YOU_ENTERED_IS_INVALID,
        );
      }

      normalizedRenavam = renavam.padStart(11, '0');
    }

    return await this.vehicleRepository.updateOne(id, {
      ...updateOneVehicleInputDto,
      updatedAt: new Date(),
      renavam: normalizedRenavam,
    });
  }
}
