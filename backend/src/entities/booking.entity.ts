/* PATCH begins */
import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookedRoom } from './bookedroom.entity';
import { Payment } from './payment.entity';
import { Customer } from './customer.entity';

@Entity()
export class Booking {
  @PrimaryColumn() BID: string;
  @Column() CusCID: string;
  @Column() CheckInDate: string;
  @Column() CheckOutDate: string;
  @Column() Duration: number;
  @Column() RoomAmount: number;

  /* NEW ↓ */
  @Column() BookingStatus: string; // waiting | check-in | check-out
  @Column('float', { default: 0 }) Total: number;

  @ManyToOne(() => Customer, (c) => c.bookings)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;

  @OneToMany(() => BookedRoom, (br) => br.booking) bookedRooms: BookedRoom[];
  @OneToMany(() => Payment, (p) => p.booking) payments: Payment[];
}
/* PATCH ends */
