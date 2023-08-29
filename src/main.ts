import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';//import config module


async function bootstrap() {
  const serverConfig = config.get('server');//get the server config from config/default.json
  const logger = new Logger('bootstrap');//create a new instance of logger class
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1');
  // await app.listen(process.env.port);
  const port = 
      process.env.PORT //if server is running like---> node server.js PORT=3001 npm run start:dev
    || 
      serverConfig.port;//get the port from the config file
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
