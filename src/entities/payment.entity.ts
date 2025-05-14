import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryColumn() BID: string;
  @Column() CusCID: string;
  @Column('float') PayTotal: number;
  @Column() PayMethod: string;
  @Column() PayDate: string;
  @Column() PayStatus: string;
}
