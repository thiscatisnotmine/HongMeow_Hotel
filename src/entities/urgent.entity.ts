import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Urgent {
  @PrimaryGeneratedColumn() id: number;
  @Column() CusCID: string;
  @Column() UrFname: string;
  @Column() UrLname: string;
  @Column() UrRelationship: string;
  @Column() UrPhone: string;

  @ManyToOne(() => Customer, (customer) => customer.urgents)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;
}
