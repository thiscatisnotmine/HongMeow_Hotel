import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { RoomType } from './roomtype.entity';
import { Room } from './room.entity';
import { Pet } from './pet.entity';

@Entity()
export class BookedRoom {
  @PrimaryGeneratedColumn() id: number;
  @Column() BID: string;
  @Column() RTID: string;
  @Column() RID: number;
  @Column({ type: 'int' }) PID: number;
  @Column() RoomStatus: string;

  @ManyToOne(() => Booking, (booking) => booking.bookedRooms)
  @JoinColumn({ name: 'BID' })
  booking: Booking;

  @ManyToOne(() => RoomType, (roomType) => roomType.bookedRooms)
  @JoinColumn({ name: 'RTID' })
  roomType: RoomType;

  @ManyToOne(() => Room, (room) => room.RID)
  @JoinColumn({ name: 'RID' })
  room: Room;

  @ManyToOne(() => Pet)
  @JoinColumn({ name: 'PID' })
  pet: Pet;
}
