// backend/src/entities/pet.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'pet' })
export class Pet {
  @PrimaryGeneratedColumn({ name: 'PID', type: 'int' })
  PID: number;

  @Column({ name: 'CusCID' })
  CusCID: string;

  @Column({ name: 'PName' })
  PName: string;

  @Column({ name: 'PType' })
  PType: string;

  @Column({ name: 'PBreeds' })
  PBreeds: string;

  @Column({ name: 'PAge', type: 'int' })
  PAge: number;

  @Column({ name: 'PVaccine', type: 'boolean', default: false })
  PVaccine: boolean;

  @Column({ name: 'PDisease', nullable: true })
  PDisease: string;

  @ManyToOne(() => Customer, (cust) => cust.pets)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;
}
