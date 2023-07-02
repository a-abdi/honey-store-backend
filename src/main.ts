import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Honey Backend Store')
    .setDescription('Honey Backend Store')
    .setVersion('1.0')
    .addTag('Honey')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  useContainer(app.select(AppModule), {fallbackOnErrors: true}); 
  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    index: false,
    prefix: '/upload',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
