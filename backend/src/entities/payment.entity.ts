import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { Customer } from './customer.entity';

@Entity()
export class Payment {
  /** PK = Booking ID (one-to-one) */
  @PrimaryColumn() BID: string;

  /** FK → Customer */
  @Column() CusCID: string;
  @ManyToOne(() => Customer, (c) => c.payments)
  @JoinColumn({ name: 'CusCID', referencedColumnName: 'CusCID' })
  customer: Customer;

  @ManyToOne(() => Booking, (b) => b.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'BID', referencedColumnName: 'BID' })
  booking: Booking;

  @Column('float') PayTotal: number;
  @Column() PayMethod: string; // Cash | Card | Transfer
  @Column() PayStatus: string; // Paid | Pending
  @Column({ type: 'date', nullable: true }) PayDate: Date | null;
}
