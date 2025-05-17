// backend/src/booking/booking.controller.ts
import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /** Create a new booking */
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  /** Bookings waiting for check-in */
  @Get('check-in/:cusId')
  getCheckInBookings(@Param('cusId') cusId: string) {
    return this.bookingService.getCheckInBookings(cusId);
  }

  /** Bookings currently checked-in */
  @Get('check-out/:cusId')
  getCheckOutBookings(@Param('cusId') cusId: string) {
    return this.bookingService.getCheckOutBookings(cusId);
  }

  /** Update booking status (e.g. to “check-in”, “check-out”) */
  @Put('update-status')
  updateBookingStatus(@Body() body: { BID: string; status: string }) {
    return this.bookingService.updateStatus(body.BID, body.status);
  }

  /** Retrieve bookings eligible for receipt (i.e. checked-out) */
  @Get('receipt/:citizenId')
  getReceiptBookings(@Param('citizenId') citizenId: string) {
    return this.bookingService.getReceiptBookings(citizenId);
  }

  /** Generate a combined receipt for multiple bookings */
  @Post('receipt')
  generateReceipt(@Body() body: { bookingIds: string[] }) {
    return this.bookingService.generateReceipt(body.bookingIds.map(String));
  }

  /** Full booking history (admin/reporting) */
  @Get('bookinghistory')
  getBookingHistory() {
    return this.bookingService.getBookingHistory();
  }

  /** Upcoming‐check-in or unpaid notifications */
  @Get('notification')
  getNotifications() {
    return this.bookingService.getNotifications();
  }
}
