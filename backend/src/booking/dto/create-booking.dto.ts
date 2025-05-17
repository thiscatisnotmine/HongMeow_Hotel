// backend/src/booking/dto/create-booking.dto.ts

import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  CusCID: string;

  @IsDateString()
  CheckInDate: string;

  @IsDateString()
  CheckOutDate: string;

  @IsInt()
  @Min(1)
  Duration: number;

  @IsInt()
  @Min(1)
  RoomAmount: number;
}
