import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Pet {
  @PrimaryColumn() PID: string;
  @Column() CusCID: string;
  @Column() PName: string;
  @Column() PType: string;
  @Column() PBreeds: string;
  @Column() PAge: number;
  @Column() PVaccine: string;
  @Column() PDisease: string;

  @ManyToOne(() => Customer, (customer) => customer.pets)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;
}
