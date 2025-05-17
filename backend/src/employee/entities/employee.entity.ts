/* --- Begin hong-meow-hotel/backend/src/employee/entities/employee.entity.ts --- */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn() // 13-digit Thai citizen ID
  EmpCID: string;

  @Column()
  EmpFname: string;

  @Column()
  EmpLname: string;

  @Column()
  EmpRole: string; // “Admin”, “Reception”, etc.

  @Column({ type: 'date' })
  EmpBirth: Date;

  @Column({ type: 'int' })
  EmpAge: number;

  @Column()
  EmpPhone: string;

  @Column()
  EmpEmail: string;

  @Column()
  EmpAddress: string;

  @Column()
  EmpUsername: string;

  @Column()
  EmpPassword: string;
}
/* --- End hong-meow-hotel/backend/src/employee/entities/employee.entity.ts --- */
