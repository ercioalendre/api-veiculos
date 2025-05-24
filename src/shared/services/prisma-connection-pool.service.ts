import { PrismaClient } from '@prisma/client';
import { EnvUtil } from 'src/shared/utils';
import { IPrismaConnectionPool } from 'src/shared/interfaces';

export class PrismaConnectionPool extends IPrismaConnectionPool {
  private prismaConnections: Map<string, PrismaClient> = new Map();

  private readonly main = 'MAIN';

  public connect(): PrismaClient {
    if (this.prismaConnections.has(this.main)) {
      return this.prismaConnections.get(this.main) as PrismaClient;
    }

    const prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: EnvUtil.getOrThrow('DATABASE_URL'),
        },
      },
    });

    this.prismaConnections.set(this.main, prismaClient);

    return prismaClient;
  }

  public async disconnect(): Promise<void> {
    if (this.prismaConnections.has(this.main)) {
      await this.prismaConnections.get(this.main)?.$disconnect();

      this.prismaConnections.delete(this.main);
    }
  }
}
