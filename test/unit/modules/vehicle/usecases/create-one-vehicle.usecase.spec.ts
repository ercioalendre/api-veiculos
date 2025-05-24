import { ConflictException } from '@nestjs/common';
import { ICreateOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { IVehicleRepository } from 'src/shared/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { generateFakeVehicle } from 'test/mocks';

describe('CreateOneVehicleUsecase test suite', () => {
  let usecase: ICreateOneVehicleUsecase;

  let vehicleRepository: IVehicleRepository;

  beforeAll(async () => {
    usecase = global.testingModule.get(ICreateOneVehicleUsecase);

    vehicleRepository = global.testingModule.get(IVehicleRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('Should create one vehicle', async () => {
    const createOneVehicleInputDto = generateFakeVehicle();

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(null);

    jest
      .spyOn(vehicleRepository, 'createOne')
      .mockResolvedValue(createOneVehicleInputDto);

    const result = await usecase.execute(createOneVehicleInputDto);

    expect(vehicleRepository.createOne).toHaveBeenCalled();

    expect(result).toEqual(createOneVehicleInputDto);
  });

  it('Should throw ConflictException when license plate already exists', async () => {
    const createOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      licensePlate: createOneVehicleInputDto.licensePlate,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(usecase.execute(createOneVehicleInputDto)).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'licensePlate',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.createOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when chassi already exists', async () => {
    const createOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      chassi: createOneVehicleInputDto.chassi,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(usecase.execute(createOneVehicleInputDto)).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'chassi',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.createOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when renavam already exists', async () => {
    const createOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      renavam: createOneVehicleInputDto.renavam,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(usecase.execute(createOneVehicleInputDto)).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'renavam',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.createOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when licensePlate already exists', async () => {
    const createOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      licensePlate: createOneVehicleInputDto.licensePlate,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(usecase.execute(createOneVehicleInputDto)).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'licensePlate',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.createOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when renavam is not valid', async () => {
    const createOneVehicleInputDto = generateFakeVehicle({ renavam: 'abc123' });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(null);

    await expect(usecase.execute(createOneVehicleInputDto)).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_RENAVAM_YOU_ENTERED_IS_INVALID,
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.createOne).not.toHaveBeenCalled();
  });
});
