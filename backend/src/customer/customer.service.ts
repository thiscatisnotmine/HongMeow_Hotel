// backend/src/customer/customer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  /** Partial‐CID search */
  async findByCitizenIdPartial(cid: string): Promise<Customer[]> {
    return this.customerRepo.find({
      where: { CusCID: Like(`%${cid}%`) },
    });
  }

  /** Partial‐name search */
  async findByFullName(fname: string, lname: string): Promise<Customer[]> {
    return this.customerRepo.find({
      where: {
        CusFname: Like(`%${fname}%`),
        CusLname: Like(`%${lname}%`),
      },
    });
  }

  /** Exact‐ID lookup */
  async findByCustomerId(id: string): Promise<Customer | null> {
    return this.customerRepo.findOne({ where: { CusCID: id } });
  }

  /** Upsert: insert new or update existing */
  async createOrUpdate(dto: CreateCustomerDto): Promise<Customer> {
    // .save() will INSERT if PK not found, or UPDATE if it is
    return await this.customerRepo.save(dto);
  }

  /** Raw SQL: pet counts */
  async getCustomersWithPetCount() {
    return this.customerRepo.query(`
      SELECT c.CusCID, c.CusFname, COUNT(p.PID) AS petCount
      FROM Customer c
      LEFT JOIN Pet p ON c.CusCID = p.CusCID
      GROUP BY c.CusCID, c.CusFname;
    `);
  }

  /** Raw SQL: upcoming bookings */
  async getCustomersWithUpcomingBookings() {
    return this.customerRepo.query(`
      SELECT DISTINCT c.CusCID, c.CusFname, b.CheckInDate
      FROM Customer c
      JOIN Booking b ON c.CusCID = b.CusCID
      WHERE b.CheckInDate > CURRENT_DATE;
    `);
  }
}
