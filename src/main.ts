import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// core
import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT || 3000);
  app.enableCors()
  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    let serverUrl = 'https://nest-js-wine.vercel.app/'
    // write swagger ui files
    get(
      `${serverUrl}/swagger/swagger-ui-bundle.js`, function
      (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    }).on('error', function (err) {
      console.log('Error loading swagger-ui-bundle.js:', err);
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    }).on('error', function (err) {
      console.log('Error loading swagger-ui-init.js:', err);
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      }).on('error', function (err) {
        console.log('Error loading swagger-ui-standalone-preset.js:', err);
      });

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    }).on('error', function (err) {
      console.log('Error loading swagger-ui.css:', err);
    });

  }
}

bootstrap();
console.log("im still getting on webbroser oading failed for the <script> with source “https://nest-6xd0nh75m-dartora.vercel.app/swagger/swagger-ui-bundle.js”. swagger:69:45");
console.log("Loading failed for the <script> with source “https://nest-6xd0nh75m-dartora.vercel.app/swagger/swagger-ui-standalone-preset.js”. swagger:70:56");
console.log("from vercel cerver");