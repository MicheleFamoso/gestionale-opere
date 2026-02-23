import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Questo permette al DTO di trasformare i dati nei tipi corretti
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
