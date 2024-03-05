import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/interceptors/transform.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { configureDayjs } from '@/config/dayjs.config';

configureDayjs();

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  const configService = app.get<ConfigService>(ConfigService);

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  const configSwagger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('SWorkspace API Document')
    .setDescription('SWorkspace API')
    .setVersion('1.0')
    .addServer('http://localhost:8080', 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = configService.get('PORT') ?? 8080;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
