import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerUI from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS With JWT')
    .setDescription('The DARTORA TI API description')
    .setVersion('1.0')
    .addTag('studies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use("/", swaggerUI.serve, swaggerUI.setup(document, {
    customCss: 'https://cdn.jsdelivr.net/webjars/org.webjars/swagger-ui/5.0.0/swagger-ui.css'
  }));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));
