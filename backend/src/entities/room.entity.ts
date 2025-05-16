import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoomType } from './roomtype.entity';

@Entity()
export class Room {
  @PrimaryColumn() RID: number;
  @Column() RTID: string;
  @Column() RState: string;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  @JoinColumn({ name: 'RTID' })
  roomType: RoomType;
}
