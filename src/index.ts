'use strict';

import 'ts-helpers';
import 'reflect-metadata';

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot());
  await app.listen(8080);
}

export default bootstrap();
