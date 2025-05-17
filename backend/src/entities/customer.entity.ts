// backend/src/entities/customer.entity.ts

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';
import { Pet } from './pet.entity';
import { Urgent } from './urgent.entity';
import { Payment } from './payment.entity';

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryColumn({ name: 'CusCID', type: 'varchar', length: 20 })
  CusCID: string;

  @Column({ name: 'CusFname' })
  CusFname: string;

  @Column({ name: 'CusLname' })
  CusLname: string;

  @Column({ name: 'CusPhone' })
  CusPhone: string;

  @Column({ name: 'CusEmail' })
  CusEmail: string;

  @OneToMany(() => Booking, (booking) => booking.customer, {
    onDelete: 'CASCADE',
  })
  bookings: Booking[];

  @OneToMany(() => Pet, (pet) => pet.customer, { onDelete: 'CASCADE' })
  pets: Pet[];

  @OneToMany(() => Urgent, (u) => u.customer)
  urgents: Urgent[];

  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];
}
