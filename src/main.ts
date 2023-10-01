import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
  const swaggerRoute = process.env.NODE_ENV === 'production' ? '/swagger' : '/api/swagger';

  SwaggerModule.setup(swaggerRoute, app, document, { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.min.css' });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));

