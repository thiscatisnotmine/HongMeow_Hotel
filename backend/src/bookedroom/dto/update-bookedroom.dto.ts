import { IsString, IsNumber, IsIn } from 'class-validator';

export class UpdateBookedRoomDto {
  @IsNumber()
  BID: number;

  @IsString()
  RTID: string;

  @IsNumber()
  RID: number;

  @IsString()
  @IsIn(['check-in', 'check-out'])
  RoomStatus: string;
}
