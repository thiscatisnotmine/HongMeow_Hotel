import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { seedData } from './seeder/seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Get DataSource and run seed
  const dataSource = app.get(DataSource);
  await seedData(dataSource);

  await app.listen(3000);
}
bootstrap();
