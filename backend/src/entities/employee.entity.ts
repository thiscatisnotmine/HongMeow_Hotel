import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn() EmpCID: string;
  @Column() EmpFname: string;
  @Column() EmpLname: string;
  @Column() EmpRole: string;
  @Column() EmpBirth: string;
  @Column() EmpAge: number;
  @Column() EmpPhone: string;
  @Column() EmpEmail: string;
  @Column() EmpAddress: string;
  @Column() EmpUsername: string;
  @Column() EmpPassword: string;
}
