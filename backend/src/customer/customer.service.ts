/* --- Begin hong-meow-hotel/backend/src/customer/customer.service.ts --- */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Customer } from '../entities/customer.entity'; // central entity folder

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  /** ─────────────────────────────────────────────
   *  Search customers whose citizen-ID *contains* `cid`
   *  (e.g. “123” → CID LIKE %123%)
   * ───────────────────────────────────────────── */
  async findByCitizenIdPartial(cid: string): Promise<Customer[]> {
    return this.customerRepo.find({
      where: { CusCID: Like(`%${cid}%`) },
    });
  }

  /** ─────────────────────────────────────────────
   *  Search by first *and* last name (partial match)
   * ───────────────────────────────────────────── */
  async findByFullName(fname: string, lname: string): Promise<Customer[]> {
    return this.customerRepo.find({
      where: {
        CusFname: Like(`%${fname}%`),
        CusLname: Like(`%${lname}%`),
      },
    });
  }

  /** Get one customer by exact citizen-ID */
  async findByCustomerId(id: string): Promise<Customer | null> {
    return this.customerRepo.findOne({ where: { CusCID: id } });
  }

  /** Customer list with COUNT(pets) */
  async getCustomersWithPetCount() {
    return this.customerRepo.query(`
      SELECT c.CusCID,
             c.CusFname,
             COUNT(p.PID) AS petCount
      FROM Customer c
      LEFT JOIN Pet p ON c.CusCID = p.CusCID
      GROUP BY c.CusCID, c.CusFname;
    `);
  }

  /** Customers who have any future booking */
  async getCustomersWithUpcomingBookings() {
    return this.customerRepo.query(`
      SELECT DISTINCT c.CusCID,
                      c.CusFname,
                      b.CheckInDate
      FROM Customer c
      JOIN Booking b ON c.CusCID = b.CusCID
      WHERE b.CheckInDate > CURRENT_DATE;
    `);
  }
}
/* --- End hong-meow-hotel/backend/src/customer/customer.service.ts --- */
