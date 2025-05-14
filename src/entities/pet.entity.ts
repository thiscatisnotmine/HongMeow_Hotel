import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryColumn() PID: string;
  @Column() CusCID: string;
  @Column() PName: string;
  @Column() PType: string;
  @Column() PBreeds: string;
  @Column() PAge: number;
  @Column() PVaccine: string;
  @Column() PDisease: string;
}
