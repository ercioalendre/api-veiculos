import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ICreateOneVehicleUsecase,
  IDeleteOneVehicleUsecase,
  IGetManyVehicleUsecase,
  IGetOneVehicleUsecase,
  IUpdateOneVehicleUsecase,
} from 'src/domain/vehicle/interfaces';
import {
  CreateOneVehicleUsecase,
  DeleteOneVehicleUsecase,
  GetManyVehicleUsecase,
  GetOneVehicleUsecase,
  UpdateOneVehicleUsecase,
} from 'src/domain/vehicle/usecases';
import {
  IPrismaConnectionPool,
  IVehicleRepository,
} from 'src/shared/interfaces';
import { VehicleRepository } from 'src/shared/repositories';
import { PrismaConnectionPool } from 'src/shared/services';

beforeAll(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      {
        provide: IPrismaConnectionPool,
        useClass: PrismaConnectionPool,
      },
      {
        provide: IVehicleRepository,
        useClass: VehicleRepository,
      },
      {
        provide: ICreateOneVehicleUsecase,
        useClass: CreateOneVehicleUsecase,
      },
      {
        provide: IGetManyVehicleUsecase,
        useClass: GetManyVehicleUsecase,
      },
      {
        provide: IGetOneVehicleUsecase,
        useClass: GetOneVehicleUsecase,
      },
      {
        provide: IUpdateOneVehicleUsecase,
        useClass: UpdateOneVehicleUsecase,
      },
      {
        provide: IDeleteOneVehicleUsecase,
        useClass: DeleteOneVehicleUsecase,
      },
    ],
  }).compile();

  global.testingModule = testingModule;
});
