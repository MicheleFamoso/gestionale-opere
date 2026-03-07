import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // o la porta del frontend
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Rimuove proprietà non definite nel DTO
      forbidNonWhitelisted: true, // Blocca la richiesta se ci sono proprietà extra
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
