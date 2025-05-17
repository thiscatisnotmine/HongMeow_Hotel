/* --- Begin patch --- */
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoomType } from './roomtype.entity';

@Entity()
export class Room {
  @PrimaryColumn() RID: number;
  @Column() RTID: string;

  /** logical state – eg. Available / OutOfOrder */
  @Column({ default: 'Available' })
  RStatus: string;

  /** optional physical status (clean / dirty, etc.) */
  @Column({ default: 'Normal' })
  RState: string;

  @ManyToOne(() => RoomType, (rt) => rt.rooms)
  @JoinColumn({ name: 'RTID', referencedColumnName: 'RTID' })
  roomType: RoomType;
}
/* --- End patch --- */
