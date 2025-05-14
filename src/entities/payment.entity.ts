import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { Customer } from './customer.entity';

@Entity()
export class Payment {
  @PrimaryColumn() BID: string;
  @Column() CusCID: string;
  @Column('float') PayTotal: number;
  @Column() PayMethod: string;
  @Column() PayDate: string;
  @Column() PayStatus: string;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  @JoinColumn({ name: 'BID' })
  booking: Booking;

  @ManyToOne(() => Customer, (customer) => customer.payments)
  @JoinColumn({ name: 'CusCID' })
  customer: Customer;
}
