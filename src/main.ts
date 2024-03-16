/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2023-10-28
 * Author: Ks Tan
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SimpleAppExceptionFilter } from './simpleapp/generate/commons/exceptions/SimpleAppExceptionFilter';
import { HttpAdapterHost } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {writeFileSync} from 'fs';
import { LogLevel } from '@nestjs/common';
const yaml = require('yaml');

async function bootstrap() {
  const logs:LogLevel[] = String(process.env.LOGGER).split(',') as LogLevel[]
  const app = await NestFactory.create(AppModule, {
    logger: logs,
  });

  // app.enableCors();
  const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new SimpleAppExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription(process.env.PROJECT_DESCRIPTION)
    .setVersion(process.env.PROJECT_VERSION)
    .addApiKey(
      {
        in: 'header',
        name: 'x-org',
        type: 'apiKey',
        description: 'base 64 url encode. example: MC0wLTA/MS0xLTE',
      },
      'x-org',
    )
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `${process.env.OAUTH2_CONFIGURL}/protocol/openid-connect/auth`,
            scopes: {},
          },
        },
      },
      'oauth2',
    )
    .addSecurityRequirements('x-org')
    .addSecurityRequirements('oauth2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { showExtensions: true, persistAuthorization: true },
  });

  writeFileSync('./openapi.yaml', yaml.stringify(document));
  
  await app.listen(process.env.HTTP_PORT ?? 8000); //listen which port
}
bootstrap();
