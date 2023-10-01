import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { swaggerUI } from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS With JWT')
    .setDescription('The DARTORA TI API description')
    .setVersion('1.0')
    .addTag('studies')
    .build();

  const options = { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css' };
  const document = SwaggerModule.createDocument(app, config);
  app.use("/", swaggerUI.serve, swaggerUI.setup(document));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

