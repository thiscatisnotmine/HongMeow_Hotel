import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { BookedroomService } from './bookedroom.service';
import { UpdateBookedRoomDto } from './dto/update-bookedroom.dto';

@Controller('bookedroom')
export class BookedroomController {
  constructor(private readonly bookedroomService: BookedroomService) {}

  // Get booked rooms by booking ID
  @Get('by-booking/:bookingId')
  async getByBookingId(@Param('bookingId') bookingId: string) {
    const bookedRooms = await this.bookedroomService.findByBookingId(
      Number(bookingId),
    );
    if (!bookedRooms.length)
      throw new NotFoundException('No booked rooms found');
    return bookedRooms;
  }

  // Update room status (check-in or check-out)
  @Put('update-status')
  async updateStatus(@Body() dto: UpdateBookedRoomDto) {
    return await this.bookedroomService.updateStatus(dto);
  }
}
