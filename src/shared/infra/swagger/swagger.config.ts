import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication): void => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cardiotrack')
    .setDescription('Service to handle the auth')
    .setVersion('1.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  const swaggerDocumentOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  };

  SwaggerModule.setup('api/docs', app, swaggerDocument, swaggerDocumentOptions);
};
