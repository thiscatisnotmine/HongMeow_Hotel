// backend/src/customer/customer.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('search-by-cid')
  searchByCID(@Query('cid') cid: string): Promise<Customer[]> {
    return this.customerService.findByCitizenIdPartial(cid);
  }

  @Get('search-by-name')
  searchByName(
    @Query('fname') fname: string,
    @Query('lname') lname: string,
  ): Promise<Customer[]> {
    return this.customerService.findByFullName(fname, lname);
  }

  @Get('search-by-id/:id')
  findById(@Param('id') id: string): Promise<Customer | null> {
    return this.customerService.findByCustomerId(id);
  }

  @Get('with-pet-count')
  getCustomersWithPetCount() {
    return this.customerService.getCustomersWithPetCount();
  }

  @Get('upcoming-bookings')
  getCustomersWithUpcomingBookings() {
    return this.customerService.getCustomersWithUpcomingBookings();
  }

  // ← new endpoint
  @Post()
  createOrUpdate(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.createOrUpdate(dto);
  }
}
