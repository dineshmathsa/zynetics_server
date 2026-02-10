import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // removes extra fields
      forbidNonWhitelisted: true, // throws if unknown fields present
      transform: true,        // converts payload to DTO instance
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


