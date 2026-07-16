import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Start server
  await app.listen(process.env.PORT ?? 4000);

  const url = await app.getUrl();

  console.log(`
  🚀 ==========================================
        Nugroho & Agata
  ==========================================

  ✅ Server Status : RUNNING
  🌐 Local URL     : ${url}
  📅 Started At    : ${new Date().toLocaleString()}

  ==========================================
  `);
}

bootstrap();