/* backend/src/main.ts */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { AppModule } from './app.module';
import { seedData } from './seeder/seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false, // turn default off so we control it
  });

  /* 🔓  DEV-only – allow ANY origin */
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const dataSource = app.get(DataSource);
  await seedData(dataSource);

  await app.listen(5000, '0.0.0.0');
  console.log('🚀  Backend listening on http://localhost:5000');
}
bootstrap();
