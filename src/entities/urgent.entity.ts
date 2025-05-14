import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Urgent {
  @PrimaryGeneratedColumn() id: number;
  @Column() CusCID: string;
  @Column() UrFname: string;
  @Column() UrLname: string;
  @Column() UrRelationship: string;
  @Column() UrPhone: string;
}
