import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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
  SwaggerModule.setup('swagger', app, document);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Backend Generator',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-es-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.css',
    ],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));

