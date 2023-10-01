import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerOptions } from 'swagger-ui-express';
import * as swaggerUI from 'swagger-ui-dist';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS With JWT')
    .setDescription('The DARTORA TI API description')
    .setVersion('1.0')
    .addTag('studies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use("/", swaggerUI.SwaggerUIBundle, swaggerUI.SwaggerUIStandalonePreset(document));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));

