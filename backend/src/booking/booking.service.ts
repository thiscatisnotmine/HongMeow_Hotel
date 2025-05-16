/* --- Begin hong-meow-hotel/backend/src/booking/booking.service.ts --- */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    private readonly dataSource: DataSource,
  ) {}

  async getCheckInBookings(cusId: string) {
    return this.bookingRepo.find({
      where: {
        CusCID: cusId,
        BookingStatus: 'waiting',
      },
    });
  }

  async getCheckOutBookings(cusId: string) {
    return this.bookingRepo.find({
      where: {
        CusCID: cusId,
        BookingStatus: 'check-in',
      },
    });
  }

  async updateStatus(BID: string, status: string) {
    const result = await this.bookingRepo.update(
      { BID },
      { BookingStatus: status },
    );
    return result.affected === 1;
  }

  async getReceiptBookings(citizenId: string) {
    return this.bookingRepo.find({
      where: {
        CusCID: citizenId,
        BookingStatus: 'check-out',
      },
    });
  }

  async generateReceipt(bookingIds: string[]) {
    const bookings = await this.bookingRepo.findByIds(bookingIds);
    const total = bookings.reduce((sum, b) => sum + b.Total, 0);
    return {
      date: new Date(),
      bookings,
      total,
    };
  }

  async getBookingHistory() {
    return await this.dataSource.query(`
      SELECT 
        b.*, 
        cus."CusFname", cus."CusLname", cus."CusPhone", cus."CusEmail",
        pet."PID", pet."PType", pet."PName",
        p."PayStatus", br."RoomStatus",
        u."UrFname", u."UrLname", u."UrRelationship", u."UrPhone"
      FROM "Booking" b
      JOIN "BookedRoom" br ON br."BID" = b."BID"
      JOIN "Payment" p ON p."BID" = br."BID"
      JOIN "Customer" cus ON cus."CusCID" = p."CusCID"
      JOIN "Pet" pet ON pet."CusCID" = cus."CusCID"
      JOIN "Urgent" u ON u."CusCID" = pet."CusCID";
    `);
  }

  async getNotifications() {
    return await this.dataSource.query(`
      SELECT 
        c."CusCID", 
        c."CusFname", 
        c."CusLname", 
        c."CusPhone", 
        c."CusEmail", 
        p."PayStatus", 
        b."CheckInDate", 
        CASE 
          WHEN p."PayStatus" = 'Pending' AND b."CheckInDate" = CURRENT_DATE + INTERVAL '1 day' THEN 'Unpaid, Check-in Tomorrow'
          WHEN p."PayStatus" = 'Pending' THEN 'Unpaid'
          WHEN b."CheckInDate" = CURRENT_DATE + INTERVAL '1 day' THEN 'Check-in Tomorrow'
          ELSE '' 
        END AS "Note"
      FROM "BookedRoom" br
      JOIN "Payment" p ON p."BID" = br."BID"
      JOIN "Booking" b ON b."BID" = p."BID"
      JOIN "Customer" c ON c."CusCID" = b."CusCID"
      WHERE p."PayStatus" = 'Pending' OR b."CheckInDate" = CURRENT_DATE + INTERVAL '1 day';
    `);
  }
}
/* --- End hong-meow-hotel/backend/src/booking/booking.service.ts --- */
