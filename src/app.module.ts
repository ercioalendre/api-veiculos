import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { IPrismaConnectionPool } from 'src/shared/interfaces';
import { PrismaConnectionPool } from 'src/shared/services';
import { DomainModule } from 'src/domain';
import { HealthCheckController } from 'src/infra/health-check/controllers';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule, EventEmitterModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.getOrThrow('RATE_LIMITING_TTL'),
          limit: configService.getOrThrow('RATE_LIMITING_LIMIT'),
        },
      ],
    }),
    DomainModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: IPrismaConnectionPool,
      useClass: PrismaConnectionPool,
    },
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
