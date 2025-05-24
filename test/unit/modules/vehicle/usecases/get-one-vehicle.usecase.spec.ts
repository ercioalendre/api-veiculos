import { NotFoundException } from '@nestjs/common';
import { IGetOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { IVehicleRepository } from 'src/shared/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { generateFakeVehicle } from 'test/mocks';

describe('GetOneVehicleUsecase test suite', () => {
  let usecase: IGetOneVehicleUsecase;

  let vehicleRepository: IVehicleRepository;

  beforeAll(async () => {
    usecase = global.testingModule.get(IGetOneVehicleUsecase);

    vehicleRepository = global.testingModule.get(IVehicleRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('Should get one vehicle', async () => {
    const getOneVehicleInputDto = generateFakeVehicle();

    jest
      .spyOn(vehicleRepository, 'getOne')
      .mockResolvedValue(getOneVehicleInputDto);

    const result = await usecase.execute(getOneVehicleInputDto.id);

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(result).toEqual(getOneVehicleInputDto);
  });

  it('Should throw NotFoundException when vehicle does not exist', async () => {
    const getOneVehicleInputDto = generateFakeVehicle();

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(null);

    await expect(usecase.execute(getOneVehicleInputDto.id)).rejects.toThrow(
      new NotFoundException(
        VehicleMessageConstant.THE_VEHICLE_YOU_ARE_LOOKING_FOR_DOES_NOT_EXIST,
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();
  });
});
