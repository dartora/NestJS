import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import swaggerUI from "swagger-ui-express";
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
      servers: [
        {
          url: "https://nest-js-wine.vercel.app/",
          description: "My API Documentation",
        },
      ],
    },
    // This is to call all the file
    apis: ["src/**/*.js"],
  };

  const specs = swaggerJsDoc(options);

  const config = new DocumentBuilder()
    .setTitle('NestJS With JWT')
    .setDescription('The DARTORA TI API description')
    .setVersion('1.0')
    .addTag('studies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerRoute = process.env.NODE_ENV === 'production' ? '/swagger' : '/api/swagger';
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.min.css' })
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));


