import { NotFoundException } from '@nestjs/common';
import { IDeleteOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { IVehicleRepository } from 'src/shared/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { generateFakeVehicle } from 'test/mocks';

describe('DeleteOneVehicleUsecase test suite', () => {
  let usecase: IDeleteOneVehicleUsecase;

  let vehicleRepository: IVehicleRepository;

  beforeAll(async () => {
    usecase = global.testingModule.get(IDeleteOneVehicleUsecase);

    vehicleRepository = global.testingModule.get(IVehicleRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('Should delete one vehicle', async () => {
    const deleteOneVehicleInputDto = generateFakeVehicle();

    jest
      .spyOn(vehicleRepository, 'getOne')
      .mockResolvedValue(deleteOneVehicleInputDto);

    jest
      .spyOn(vehicleRepository, 'deleteOne')
      .mockResolvedValue(deleteOneVehicleInputDto);

    const result = await usecase.execute(deleteOneVehicleInputDto.id);

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.deleteOne).toHaveBeenCalled();

    expect(result).toEqual(deleteOneVehicleInputDto);
  });

  it('Should throw NotFoundException when vehicle does not exist', async () => {
    const deleteOneVehicleInputDto = generateFakeVehicle();

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(null);

    await expect(usecase.execute(deleteOneVehicleInputDto.id)).rejects.toThrow(
      new NotFoundException(
        VehicleMessageConstant.THE_VEHICLE_YOU_ARE_TRYING_TO_DELETE_DOES_NOT_EXIST,
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();
  });
});
