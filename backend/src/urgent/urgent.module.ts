import { Module } from '@nestjs/common';
import { UrgentService } from './urgent.service';
import { UrgentController } from './urgent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urgent } from '../entities/urgent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Urgent])],
  controllers: [UrgentController],
  providers: [UrgentService],
})
export class UrgentModule {}
