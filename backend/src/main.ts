import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Validates incoming data automatically
  app.enableCors({
    origin: ['https://social-media-nextjs-pearl.vercel.app/','https://vercel.com/suyash-pathak04s-projects/social-media-nextjs/Cah82CV26xkDdEX35aFm6BRQUvg7'],
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(3000);
}
bootstrap();
