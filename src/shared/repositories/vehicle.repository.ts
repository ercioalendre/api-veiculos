import { Injectable } from '@nestjs/common';
import {
  IVehicleRepository,
  IPrismaConnectionPool,
} from 'src/shared/interfaces';
import { VehicleEntity } from 'src/shared/entities';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehicleRepository implements IVehicleRepository {
  constructor(
    private readonly prismaTenantConnectionPool: IPrismaConnectionPool,
  ) {}

  public async createOne(
    data: Prisma.VehicleUncheckedCreateInput,
  ): Promise<VehicleEntity> {
    return this.prismaTenantConnectionPool.connect().vehicle.create({
      data,
    });
  }

  public async getOne(
    params: Prisma.VehicleFindFirstArgs,
  ): Promise<VehicleEntity> {
    return this.prismaTenantConnectionPool.connect().vehicle.findFirst(params);
  }

  public async getMany(
    params?: Prisma.VehicleFindManyArgs | null,
  ): Promise<VehicleEntity[]> {
    return this.prismaTenantConnectionPool.connect().vehicle.findMany(params);
  }

  public async updateOne(
    id: string,
    data: Prisma.VehicleUncheckedUpdateInput,
  ): Promise<VehicleEntity> {
    return this.prismaTenantConnectionPool.connect().vehicle.update({
      where: {
        id,
      },
      data,
    });
  }

  public async deleteOne(id: string): Promise<VehicleEntity> {
    return this.prismaTenantConnectionPool.connect().vehicle.delete({
      where: {
        id,
      },
    });
  }
}
