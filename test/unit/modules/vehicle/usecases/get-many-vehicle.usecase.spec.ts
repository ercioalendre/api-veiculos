import { IGetManyVehicleUsecase } from 'src/domain/vehicle/interfaces';
import { IVehicleRepository } from 'src/shared/interfaces';
import { generateFakeVehicle } from 'test/mocks';

describe('GetManyVehicleUsecase test suite', () => {
  let usecase: IGetManyVehicleUsecase;

  let vehicleRepository: IVehicleRepository;

  beforeAll(async () => {
    usecase = global.testingModule.get(IGetManyVehicleUsecase);

    vehicleRepository = global.testingModule.get(IVehicleRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('Should get one vehicle', async () => {
    const getManyVehicleInputDto = generateFakeVehicle();

    jest
      .spyOn(vehicleRepository, 'getMany')
      .mockResolvedValue([getManyVehicleInputDto]);

    const result = await usecase.execute();

    expect(vehicleRepository.getMany).toHaveBeenCalled();

    expect(result).toEqual([getManyVehicleInputDto]);
  });
});
