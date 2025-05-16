/* --- Begin hong-meow-hotel/backend/src/room/room.service.ts --- */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly dataSource: DataSource,
  ) {}

  async searchRooms(query: string): Promise<Room[]> {
    return await this.roomRepository.find({
      where: [{ RTID: ILike(`%${query}%`) }, { RID: parseInt(query) || -1 }],
      relations: ['roomType'],
    });
  }

  async updateRoomStatus(
    RTID: string,
    RID: number,
    status: string,
  ): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { RTID, RID } });
    if (!room) throw new NotFoundException('Room not found');
    room.RStatus = status;
    return this.roomRepository.save(room);
  }

  async findAvailableByType() {
    return await this.dataSource.query(`
      SELECT 
        r."RTID",
        COUNT(r."RID") AS "AvailableRooms"
      FROM "Room" r
      LEFT JOIN "BookedRoom" br  
        ON r."RID" = br."RID"  
        AND r."RTID" = br."RTID" 
        AND (br."RoomStatus" != 'Cancel' OR br."RoomStatus" IS NULL) 
      LEFT JOIN "Booking" b 
        ON br."BID" = b."BID" 
        AND (b."CheckInDate" > CURRENT_DATE OR b."CheckInDate" IS NULL) 
      WHERE r."RStatus" = 'Available' 
      GROUP BY r."RTID";
    `);
  }

  async getRoomReport() {
    return await this.dataSource.query(`
      SELECT 
        r."RTID", 
        r."RID", 
        rt."RTName", 
        r."RStatus"
      FROM "Room" r
      JOIN "RoomType" rt ON r."RTID" = rt."RTID"
      ORDER BY r."RTID" ASC;
    `);
  }

  async setRoomStatus(RTID: string, RID: number, status: string) {
    const room = await this.roomRepository.findOne({ where: { RTID, RID } });
    if (!room) throw new NotFoundException('Room not found');
    room.RStatus = status;
    return this.roomRepository.save(room);
  }
}
/* --- End hong-meow-hotel/backend/src/room/room.service.ts --- */
