// backend/src/booking/booking.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create a new booking.
   * Let TypeORM generate the UUID; never pass client-supplied BID.
   */
  async create(dto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepo.create({
      ...dto,
      BookingStatus: 'waiting',
    });

    const saved = await this.bookingRepo.save(booking);
    if (!saved || Array.isArray(saved)) {
      throw new NotFoundException(
        `Booking could not be created for customer ${dto.CusCID}`,
      );
    }
    return saved;
  }

  /** Get bookings for check-in (status = waiting) */
  async getCheckInBookings(cusId: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { CusCID: cusId, BookingStatus: 'waiting' },
    });
  }

  /** Get bookings currently checked-in (status = check-in) */
  async getCheckOutBookings(cusId: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { CusCID: cusId, BookingStatus: 'check-in' },
    });
  }

  /** Update a booking's status. Returns true if exactly one row was updated. */
  async updateStatus(BID: string, status: string): Promise<boolean> {
    const { affected } = await this.bookingRepo.update(
      { BID },
      { BookingStatus: status },
    );
    return affected === 1;
  }

  /** Get bookings ready for receipt (status = check-out) */
  async getReceiptBookings(citizenId: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { CusCID: citizenId, BookingStatus: 'check-out' },
    });
  }

  /** Generate a summary receipt for multiple bookings. */
  async generateReceipt(bookingIds: string[]): Promise<{
    date: Date;
    bookings: Booking[];
    total: number;
  }> {
    const bookings = await this.bookingRepo.findByIds(bookingIds);
    const total = bookings.reduce((sum, b) => sum + Number(b.Total || 0), 0);
    return { date: new Date(), bookings, total };
  }

  /** Administrative booking history (joined SQL). */
  async getBookingHistory(): Promise<any[]> {
    return this.dataSource.query(`
      SELECT 
        b.*, 
        cus."CusFname", cus."CusLname", cus."CusPhone", cus."CusEmail",
        pet."PID", pet."PType", pet."PName",
        p."PayStatus", br."RoomStatus",
        u."UrFname", u."UrLname", u."UrRelationship", u."UrPhone"
      FROM "Booking" b
      JOIN "BookedRoom" br ON br."BID" = b."BID"
      JOIN "Payment" p     ON p."BID" = br."BID"
      JOIN "Customer" cus  ON cus."CusCID" = p."CusCID"
      JOIN "Pet" pet       ON pet."CusCID" = cus."CusCID"
      JOIN "Urgent" u      ON u."CusCID" = pet."CusCID";
    `);
  }

  /** Notifications for upcoming check-ins or unpaid bookings. */
  async getNotifications(): Promise<any[]> {
    return this.dataSource.query(`
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
