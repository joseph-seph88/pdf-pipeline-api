import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  const isProd = process.env.NODE_ENV === 'prod';
  app.use(
    helmet({
      contentSecurityPolicy: isProd ? undefined : false,
      hsts: isProd ? undefined : false,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('Joseph88 Pdf Pipeline API')
      .setDescription('Joseph88 Pdf Pipeline API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Server running on port ${port}`, 'Bootstrap');
}
