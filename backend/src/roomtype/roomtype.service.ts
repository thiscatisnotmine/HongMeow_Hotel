import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roomtype } from './entities/roomtype.entity';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto';
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';

@Injectable()
export class RoomtypeService {
  constructor(
    @InjectRepository(Roomtype)
    private readonly roomtypeRepo: Repository<Roomtype>,
  ) {}

  create(dto: CreateRoomtypeDto) {
    return this.roomtypeRepo.save(dto);
  }

  findAll() {
    return this.roomtypeRepo.find();
  }

  findOne(id: string) {
    return this.roomtypeRepo.findOneBy({ RTID: id });
  }

  update(id: string, dto: UpdateRoomtypeDto) {
    return this.roomtypeRepo.update(id, dto);
  }

  remove(id: string) {
    return this.roomtypeRepo.delete(id);
  }
}
