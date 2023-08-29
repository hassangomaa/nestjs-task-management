import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');//create a new instance of logger class
  
  
  
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1');
  // await app.listen(process.env.port);

const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
