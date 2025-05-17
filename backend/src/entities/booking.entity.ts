// backend/src/entities/booking.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookedRoom } from './bookedroom.entity';
import { Payment } from './payment.entity';
import { Customer } from './customer.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  BID: string;

  @Column()
  CusCID: string;

  @Column({ type: 'date' })
  CheckInDate: string;

  @Column({ type: 'date' })
  CheckOutDate: string;

  @Column()
  Duration: number;

  @Column()
  RoomAmount: number;

  @Column('float', { default: 0 })
  Total: number;

  @Column({ default: 'waiting' })
  BookingStatus: string;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;

  @OneToMany(() => BookedRoom, (br) => br.booking)
  bookedRooms: BookedRoom[];

  @OneToMany(() => Payment, (p) => p.booking)
  payments: Payment[];
}
