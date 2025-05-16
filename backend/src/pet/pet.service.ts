// src/pet/pet.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  create(createPetDto: CreatePetDto) {
    const pet = this.petRepository.create(createPetDto);
    return this.petRepository.save(pet);
  }

  findAll() {
    return this.petRepository.find();
  }

  findOne(id: number) {
    return this.petRepository.findOne({ where: { PID: String(id) } });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return this.petRepository.update(id, updatePetDto);
  }

  remove(id: number) {
    return this.petRepository.delete(id);
  }

  // 🔍 Custom Search: Find all pets for a customer ID
  async findByCustomerId(cusCID: string): Promise<Pet[]> {
    return this.petRepository.find({
      where: { CusCID: cusCID },
    });
  }
}
