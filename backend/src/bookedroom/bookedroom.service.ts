import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookedRoom } from '../entities/bookedroom.entity';
import { UpdateBookedRoomDto } from './dto/update-bookedroom.dto';

@Injectable()
export class BookedroomService {
  constructor(
    @InjectRepository(BookedRoom)
    private readonly bookedRoomRepo: Repository<BookedRoom>,
  ) {}

  async findByBookingId(bookingId: number) {
    return await this.bookedRoomRepo.find({
      where: { BID: String(bookingId) },
      relations: ['room'],
    });
  }

  async updateStatus(dto: UpdateBookedRoomDto) {
    const room = await this.bookedRoomRepo.findOne({
      where: {
        BID: String(dto.BID),
        RTID: dto.RTID,
        RID: dto.RID,
      },
    });

    if (!room) throw new Error('Room not found');

    room.RoomStatus = dto.RoomStatus;
    return await this.bookedRoomRepo.save(room);
  }
}
