import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { BookedRoom } from './bookedroom.entity';
import { Payment } from './payment.entity';

@Entity()
export class Booking {
  @PrimaryColumn() BID: string;
  @Column() CusCID: string;
  @Column() CheckInDate: string;
  @Column() CheckOutDate: string;
  @Column() Duration: number;
  @Column() RoomAmount: number;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;

  @OneToMany(() => BookedRoom, (bookedRoom) => bookedRoom.booking)
  bookedRooms: BookedRoom[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];
}
