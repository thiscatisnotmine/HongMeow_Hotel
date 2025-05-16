import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedRoom } from '../entities/bookedroom.entity';
import { BookedroomService } from './bookedroom.service';
import { BookedroomController } from './bookedroom.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookedRoom])],
  controllers: [BookedroomController],
  providers: [BookedroomService],
})
export class BookedroomModule {}
