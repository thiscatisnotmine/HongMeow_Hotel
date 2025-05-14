import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookedRoom {
  @PrimaryGeneratedColumn() id: number;
  @Column() BID: string;
  @Column() RTID: string;
  @Column() RID: number;
  @Column() PID: string;
  @Column() RoomStatus: string;
}
