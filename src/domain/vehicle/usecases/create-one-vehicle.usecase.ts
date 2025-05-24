import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CreateOneVehicleInputDto,
  CreateOneVehicleOutputDto,
} from 'src/domain/vehicle/dtos';
import { IVehicleRepository } from 'src/shared/interfaces';
import { ICreateOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { validateRenavam } from 'src/shared/utils';
import { VehicleMessageConstant } from 'src/shared/constants';

@Injectable()
export class CreateOneVehicleUsecase implements ICreateOneVehicleUsecase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(
    createOneVehicleInputDto: CreateOneVehicleInputDto,
  ): Promise<CreateOneVehicleOutputDto> {
    const { licensePlate, chassi, renavam } = createOneVehicleInputDto;

    const existingVehicle = await this.vehicleRepository.getOne({
      where: {
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

    if (existingVehicle) {
      if (existingVehicle.licensePlate === licensePlate) {
        throw new ConflictException(
          VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
            'licensePlate',
          ),
        );
      } else if (existingVehicle.chassi === chassi) {
        throw new ConflictException(
          VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
            'chassi',
          ),
        );
      } else if (existingVehicle.renavam === renavam) {
        throw new ConflictException(
          VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
            'renavam',
          ),
        );
      }
    }

    const normalizedRenavam = renavam.padStart(11, '0');

    const isRenavamValid = validateRenavam(normalizedRenavam);

    if (!isRenavamValid) {
      throw new BadRequestException(
        VehicleMessageConstant.THE_RENAVAM_YOU_ENTERED_IS_INVALID,
      );
    }

    return await this.vehicleRepository.createOne({
      ...createOneVehicleInputDto,
      id: randomUUID(),
      renavam: normalizedRenavam,
      createdAt: new Date(),
    });
  }
}
