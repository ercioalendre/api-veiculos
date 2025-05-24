import { Module } from '@nestjs/common';
import { PrismaConnectionPool } from 'src/shared/services';
import { VehicleRepository } from 'src/shared/repositories';
import {
  CreateOneVehicleController,
  DeleteOneVehicleController,
  GetManyVehicleController,
  GetOneVehicleController,
  UpdateOneVehicleController,
} from 'src/domain/vehicle/controllers';
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
import {
  ICreateOneVehicleUsecase,
  IDeleteOneVehicleUsecase,
  IGetManyVehicleUsecase,
  IGetOneVehicleUsecase,
  IUpdateOneVehicleUsecase,
} from 'src/domain/vehicle/interfaces';

@Module({
  controllers: [
    CreateOneVehicleController,
    GetManyVehicleController,
    GetOneVehicleController,
    UpdateOneVehicleController,
    DeleteOneVehicleController,
  ],
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
  exports: [],
})
export class VehicleModule {}
