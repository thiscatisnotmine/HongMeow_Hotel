import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryColumn() BID: string;
  @Column() CusCID: string;
  @Column() CheckInDate: string;
  @Column() CheckOutDate: string;
  @Column() Duration: number;
  @Column() RoomAmount: number;
}
