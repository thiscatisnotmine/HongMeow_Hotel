/* --- Begin hong-meow-hotel/backend/src/booking/booking.controller.ts --- */
import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('check-in/:cusId')
  getCheckInBookings(@Param('cusId') cusId: string) {
    return this.bookingService.getCheckInBookings(cusId);
  }

  @Get('check-out/:cusId')
  getCheckOutBookings(@Param('cusId') cusId: string) {
    return this.bookingService.getCheckOutBookings(cusId);
  }

  @Put('update-status')
  updateBookingStatus(@Body() body: { BID: string; status: string }) {
    return this.bookingService.updateStatus(body.BID, body.status);
  }

  @Get('receipt/:citizenId')
  getReceiptBookings(@Param('citizenId') citizenId: string) {
    return this.bookingService.getReceiptBookings(citizenId);
  }

  @Post('receipt')
  generateReceipt(@Body() body: { bookingIds: string[] }) {
    return this.bookingService.generateReceipt(body.bookingIds);
  }

  @Get('bookinghistory')
  getBookingHistory() {
    return this.bookingService.getBookingHistory();
  }

  @Get('notification')
  getNotifications() {
    return this.bookingService.getNotifications();
  }
}
/* --- End hong-meow-hotel/backend/src/booking/booking.controller.ts --- */
