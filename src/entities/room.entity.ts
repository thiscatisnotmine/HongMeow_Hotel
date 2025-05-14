import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn() RID: number;
  @Column() RTID: string;
  @Column() RState: string;
}
