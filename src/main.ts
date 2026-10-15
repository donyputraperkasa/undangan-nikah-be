import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Express } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Railway / reverse proxy meneruskan protokol publik via X-Forwarded-Proto
  const express = app.getHttpAdapter().getInstance() as Express;
  express.set('trust proxy', 1);

  const port = process.env.PORT ?? 4000;
  const configuredOrigins = [process.env.FRONTEND_URL, process.env.CORS_ORIGINS]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(','))
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const allowedOrigins = [
    ...new Set([
      ...configuredOrigins,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://undangan-nikah-fe.vercel.app',
    ]),
  ];

  // Frontend lokal maupun produksi dapat mengakses API
  app.enableCors({
    origin: allowedOrigins.length > 2 ? allowedOrigins : true,
    credentials: true,
  });

  app.enableShutdownHooks();

  // DTO menjadi kontrak API: field asing ditolak dan payload ditransformasikan
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation di /api/docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Undangan Pernikahan API')
    .setDescription(
      'Dokumentasi API Backend Undangan Pernikahan Nugroho & Agata',
    )
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: (
        operationA: { get: (key: string) => string },
        operationB: { get: (key: string) => string },
      ) => {
        const methodOrder: Record<string, number> = {
          post: 1,
          get: 2,
          patch: 3,
          delete: 4,
        };

        const methodA = operationA.get('method').toLowerCase();
        const methodB = operationB.get('method').toLowerCase();

        return (methodOrder[methodA] ?? 99) - (methodOrder[methodB] ?? 99);
      },
    },
  });

  await app.listen(port);

  // Ringkasan informatif console saat aplikasi berjalan
  console.clear();
  console.log(
    '\x1b[36m%s\x1b[0m',
    '================================================',
  );
  console.log('\x1b[32m%s\x1b[0m', ' Undangan Nikah Backend is Running');
  console.log(
    '\x1b[36m%s\x1b[0m',
    '================================================',
  );
  console.log(` Server URL   : http://localhost:${port}`);
  console.log(` Swagger API  : http://localhost:${port}/api/docs`);
  console.log(` Environment  : ${process.env.NODE_ENV ?? 'development'}`);
  console.log(' Developed by : dony putra perkasa (owner)');
  console.log(
    '\x1b[36m%s\x1b[0m',
    '================================================',
  );
}

// Menangani error unhandled dan bootstrap
bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

process.on('uncaughtException', (error: unknown) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error: unknown) => {
  console.error(error);
  process.exit(1);
});
