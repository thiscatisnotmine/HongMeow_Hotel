/* --- Begin patch --- */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Urgent {
  /* replace manual UrgentID with auto-generated UUID */
  @PrimaryGeneratedColumn('uuid')
  UrgentID: string;

  /* FK → customer */
  @Column()
  CusCID: string;

  @ManyToOne(() => Customer, (c) => c.urgents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'CusCID', referencedColumnName: 'CusCID' })
  customer: Customer;

  @Column() UrFname: string;
  @Column() UrLname: string;
  @Column() UrRelationship: string;
  @Column() UrPhone: string;
}
/* --- End patch --- */
