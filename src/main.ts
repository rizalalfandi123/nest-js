import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const validation = new ValidationPipe({ whitelist: true });

  app.useGlobalPipes(validation);
  await app.listen(3010);
}

bootstrap();
