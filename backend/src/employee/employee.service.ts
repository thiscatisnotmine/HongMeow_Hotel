/* --- Begin hong-meow-hotel/backend/src/employee/employee.service.ts --- */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  create(dto: CreateEmployeeDto) {
    return this.employeeRepo.save(dto);
  }

  findAll() {
    return this.employeeRepo.find();
  }

  findOne(id: string) {
    return this.employeeRepo.findOneBy({ EmpCID: id });
  }

  update(id: string, dto: UpdateEmployeeDto) {
    return this.employeeRepo.update(id, dto);
  }

  remove(id: string) {
    return this.employeeRepo.delete(id);
  }

  findByUsername(username: string) {
    return this.employeeRepo.findOne({ where: { username } });
  }
}
/* --- End hong-meow-hotel/backend/src/employee/employee.service.ts --- */
