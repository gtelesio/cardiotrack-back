import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { AppModule } from './app.module';
import { appConfig } from './config/application.config';
import { swaggerConfig } from './shared/infra/swagger/swagger.config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  appConfig.isDevelopment && swaggerConfig(app);

  const port = appConfig.PORT;

  await app.listen(port, () => Logger.log(`Server ready on ${port}`, 'Bootstrap'));
};

bootstrap();
