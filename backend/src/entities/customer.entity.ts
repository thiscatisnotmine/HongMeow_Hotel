import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';
import { Booking } from './booking.entity';
import { Urgent } from './urgent.entity';
import { Payment } from './payment.entity';

@Entity()
export class Customer {
  @PrimaryColumn() CusCID: string;
  @Column() CusFname: string;
  @Column() CusLname: string;
  @Column() CusPhone: string;
  @Column() CusEmail: string;

  @OneToMany(() => Pet, (pet) => pet.customer) pets: Pet[];
  @OneToMany(() => Urgent, (urgent) => urgent.customer) urgents: Urgent[];
  @OneToMany(() => Booking, (booking) => booking.customer) bookings: Booking[];
  @OneToMany(() => Payment, (payment) => payment.customer) payments: Payment[];
}
