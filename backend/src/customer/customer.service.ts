import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findByCitizenIdPartial(cid: string): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { CusCID: () => `CusCID LIKE '%${cid}%'` },
    });
  }

  async findByFullName(fname: string, lname: string): Promise<Customer[]> {
    return this.customerRepository.find({
      where: {
        CusFname: () => `CusFname LIKE '%${fname}%'`,
        CusLname: () => `CusLname LIKE '%${lname}%'`,
      },
    });
  }

  async findByCustomerId(id: string): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ CusCID: id });
  }

  async getCustomersWithPetCount() {
    return this.customerRepository.query(`
      SELECT c.CusCID, c.CusFname, COUNT(p.PID) AS petCount
      FROM customer c
      LEFT JOIN pet p ON c.CusCID = p.CusCID
      GROUP BY c.CusCID
    `);
  }

  async getCustomersWithUpcomingBookings() {
    return this.customerRepository.query(`
      SELECT DISTINCT c.CusCID, c.CusFname, b.CheckInDate
      FROM customer c
      JOIN booking b ON c.CusCID = b.CusCID
      WHERE b.CheckInDate > NOW()
    `);
  }
}
