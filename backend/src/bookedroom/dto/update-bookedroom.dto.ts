import { IsString, IsNumber } from 'class-validator';

export class UpdateBookedRoomDto {
  @IsNumber()
  BID: number;

  @IsString()
  RTID: string;

  @IsNumber()
  RID: number;

  @IsString()
  RoomStatus: 'check-in' | 'check-out';
}
