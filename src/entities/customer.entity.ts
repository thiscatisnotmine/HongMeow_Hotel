import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn() CusCID: string;
  @Column() CusFname: string;
  @Column() CusLname: string;
  @Column() CusPhone: string;
  @Column() CusEmail: string;
}
