import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvUtil } from './shared/utils';

async function bootstrap() {
  if (EnvUtil.getOrThrow('TZ') !== 'America/Sao_Paulo') {
    throw new Error('Please set "process.env.TZ" to "America/Sao_Paulo".');
  }

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('System API Docs')
    .setDescription('The system API documentation.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
