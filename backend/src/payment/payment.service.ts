/* --- Begin hong-meow-hotel/backend/src/payment/payment.service.ts --- */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly dataSource: DataSource,
  ) {}

  create(dto: CreatePaymentDto) {
    return this.paymentRepo.save(dto);
  }

  findAll() {
    return this.paymentRepo.find();
  }

  findOne(id: string) {
    return this.paymentRepo.findOneBy({ PayID: id });
  }

  update(id: string, dto: UpdatePaymentDto) {
    return this.paymentRepo.update(id, dto);
  }

  remove(id: string) {
    return this.paymentRepo.delete(id);
  }

  async getBillInfo() {
    return await this.dataSource.query(`
      SELECT 
        cus."CusCID", 
        b."BID", 
        b."CheckInDate", 
        (b."CheckInDate" - INTERVAL '1 day') AS "DueDate", 
        pay."PayTotal", 
        pay."PayMethod", 
        pay."PayStatus", 
        pay."PayDate" 
      FROM "Payment" pay  
      JOIN "Booking" b ON b."BID" = pay."BID" 
      JOIN "Customer" cus ON b."CusCID" = cus."CusCID";
    `);
  }

  async getReceiptSummary() {
    return await this.dataSource.query(`
      SELECT 
        b."BID", 
        rt."RTName", 
        b."RoomAmount", 
        rt."RTPrice", 
        ROUND(b."RoomAmount" * rt."RTPrice", 2) AS "Total"
      FROM "Booking" b
      JOIN "BookedRoom" br ON b."BID" = br."BID"
      JOIN "RoomType" rt ON rt."RTID" = br."RTID";
    `);
  }
}
/* --- End hong-meow-hotel/backend/src/payment/payment.service.ts --- */
