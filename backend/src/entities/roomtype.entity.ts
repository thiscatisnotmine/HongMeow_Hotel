import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { BookedRoom } from './bookedroom.entity';

@Entity()
export class RoomType {
  @PrimaryColumn() RTID: string;
  @Column() RTName: string;
  @Column() RTDescription: string;
  @Column() RTMax: number;
  @Column() RTPrice: number;
  @Column() RTAmount: number;

  @OneToMany(() => Room, (room) => room.roomType) rooms: Room[];
  @OneToMany(() => BookedRoom, (bookedRoom) => bookedRoom.roomType)
  bookedRooms: BookedRoom[];
}
