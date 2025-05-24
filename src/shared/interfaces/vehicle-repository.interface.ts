import { Prisma } from '@prisma/client';
import { VehicleEntity } from 'src/shared/entities';

export abstract class IVehicleRepository {
  abstract createOne(
    data: Prisma.VehicleUncheckedCreateInput,
  ): Promise<VehicleEntity>;

  abstract getOne(params: Prisma.VehicleFindFirstArgs): Promise<VehicleEntity>;

  abstract getMany(
    params?: Prisma.VehicleFindManyArgs | null,
  ): Promise<VehicleEntity[]>;

  abstract updateOne(
    id: string,
    data: Prisma.VehicleUncheckedUpdateInput,
  ): Promise<VehicleEntity>;

  abstract deleteOne(id: string): Promise<VehicleEntity>;
}
