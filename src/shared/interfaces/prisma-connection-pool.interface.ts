import { PrismaClient } from '@prisma/client';

export abstract class IPrismaConnectionPool {
  abstract connect(): PrismaClient;

  abstract disconnect(isServerGracefulShutdown?: boolean): Promise<void>;
}
