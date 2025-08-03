import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'https://vercel.com/suyash-pathak04s-projects/social-media-nextjs/2sc5TSGEEhXm2G3duDRCAECMWLQG',
      'https://social-media-nextjs-xi.vercel.app',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
