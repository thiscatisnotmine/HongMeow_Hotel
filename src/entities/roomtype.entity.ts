import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RoomType {
  @PrimaryColumn() RTID: string;
  @Column() RTName: string;
  @Column() RTDescription: string;
  @Column() RTMax: number;
  @Column() RTPrice: number;
  @Column() RTAmount: number;
}
