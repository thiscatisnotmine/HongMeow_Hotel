import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoomType } from './roomtype.entity';

@Entity()
export class Room {
  @PrimaryColumn() RID: number;
  @Column() RTID: string;
  @Column() RState: string;
  @Column() RStatus: string;

  @ManyToOne(() => RoomType, (rt) => rt.rooms)
  @JoinColumn({ name: 'RTID', referencedColumnName: 'RTID' })
  roomType: RoomType;
}
