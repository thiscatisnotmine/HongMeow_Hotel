import { Module } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { RoomtypeController } from './roomtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from '../entities/roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  controllers: [RoomtypeController],
  providers: [RoomtypeService],
})
export class RoomtypeModule {}
