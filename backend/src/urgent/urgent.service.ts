import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urgent } from './entities/urgent.entity';
import { CreateUrgentDto } from './dto/create-urgent.dto';
import { UpdateUrgentDto } from './dto/update-urgent.dto';

@Injectable()
export class UrgentService {
  constructor(
    @InjectRepository(Urgent)
    private readonly urgentRepo: Repository<Urgent>,
  ) {}

  create(dto: CreateUrgentDto) {
    return this.urgentRepo.save(dto);
  }

  findAll() {
    return this.urgentRepo.find();
  }

  findOne(id: string) {
    return this.urgentRepo.findOneBy({ UrgentID: id });
  }

  update(id: string, dto: UpdateUrgentDto) {
    return this.urgentRepo.update(id, dto);
  }

  remove(id: string) {
    return this.urgentRepo.delete(id);
  }
}
