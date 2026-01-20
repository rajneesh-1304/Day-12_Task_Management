// Source - https://stackoverflow.com/a
// Posted by Dmitrii Tkachenko
// Retrieved 2026-01-20, License - CC BY-SA 4.0

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
);

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
