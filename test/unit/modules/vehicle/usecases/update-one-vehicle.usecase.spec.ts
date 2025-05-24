import { ConflictException } from '@nestjs/common';
import { IUpdateOneVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { IVehicleRepository } from 'src/shared/interfaces';
import { VehicleMessageConstant } from 'src/shared/constants';
import { generateFakeRenavam, generateFakeVehicle } from 'test/mocks';

describe('UpdateOneVehicleUsecase test suite', () => {
  let usecase: IUpdateOneVehicleUsecase;

  let vehicleRepository: IVehicleRepository;

  beforeAll(async () => {
    usecase = global.testingModule.get(IUpdateOneVehicleUsecase);

    vehicleRepository = global.testingModule.get(IVehicleRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('Should update one vehicle', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    const updatedVehicle = {
      ...updateOneVehicleInputDto,
      renavam: generateFakeRenavam(),
    };

    jest
      .spyOn(vehicleRepository, 'getOne')
      .mockResolvedValue(updateOneVehicleInputDto);

    jest
      .spyOn(vehicleRepository, 'updateOne')
      .mockResolvedValue(updatedVehicle);

    const result = await usecase.execute(updateOneVehicleInputDto.id, {
      renavam: updatedVehicle.renavam,
    });

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).toHaveBeenCalled();

    expect(result).toEqual(updatedVehicle);
  });

  it('Should throw NotFoundException when vehicle does not exist', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(null);

    await expect(
      usecase.execute(updateOneVehicleInputDto.id, { model: 'abc123' }),
    ).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VEHICLE_YOU_ARE_TRYING_TO_UPDATE_DOES_NOT_EXIST,
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when license plate already exists', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      licensePlate: updateOneVehicleInputDto.licensePlate,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(
      usecase.execute(updateOneVehicleInputDto.id, updateOneVehicleInputDto),
    ).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'licensePlate',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when chassi already exists', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      chassi: updateOneVehicleInputDto.chassi,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(
      usecase.execute(updateOneVehicleInputDto.id, updateOneVehicleInputDto),
    ).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'chassi',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when renavam already exists', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      renavam: updateOneVehicleInputDto.renavam,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(
      usecase.execute(updateOneVehicleInputDto.id, updateOneVehicleInputDto),
    ).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'renavam',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when licensePlate already exists', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    const existingVehicle = generateFakeVehicle({
      licensePlate: updateOneVehicleInputDto.licensePlate,
    });

    jest.spyOn(vehicleRepository, 'getOne').mockResolvedValue(existingVehicle);

    await expect(
      usecase.execute(updateOneVehicleInputDto.id, updateOneVehicleInputDto),
    ).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(
          'licensePlate',
        ),
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).not.toHaveBeenCalled();
  });

  it('Should throw ConflictException when renavam is not valid', async () => {
    const updateOneVehicleInputDto = generateFakeVehicle();

    jest
      .spyOn(vehicleRepository, 'getOne')
      .mockResolvedValue(updateOneVehicleInputDto);

    await expect(
      usecase.execute(updateOneVehicleInputDto.id, { renavam: 'abc123' }),
    ).rejects.toThrow(
      new ConflictException(
        VehicleMessageConstant.THE_RENAVAM_YOU_ENTERED_IS_INVALID,
      ),
    );

    expect(vehicleRepository.getOne).toHaveBeenCalled();

    expect(vehicleRepository.updateOne).not.toHaveBeenCalled();
  });
});
