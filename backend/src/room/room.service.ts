// backend/src/room/room.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly dataSource: DataSource,
  ) {}

  /** Full‐text search on type ID or numeric ID */
  async searchRooms(query: string): Promise<Room[]> {
    const id = parseInt(query, 10);
    return this.roomRepository.find({
      where: [{ RTID: ILike(`%${query}%`) }, { RID: isNaN(id) ? -1 : id }],
      relations: ['roomType'],
    });
  }

  /** Update a single room’s status */
  async updateRoomStatus(
    RTID: string,
    RID: number,
    status: string,
  ): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { RTID, RID },
    });
    if (!room) throw new NotFoundException('Room not found');
    room.RStatus = status;
    return this.roomRepository.save(room);
  }

  /** Count of available rooms grouped by RTID */
  async findAvailableByType(): Promise<
    { RTID: string; AvailableRooms: number }[]
  > {
    return this.dataSource.query(`
      SELECT
        r.RTID,
        COUNT(r.RID) AS AvailableRooms
      FROM room AS r
      LEFT JOIN booked_room AS br
        ON r.RID = br.RID
        AND r.RTID = br.RTID
        AND (br.RoomStatus <> 'Cancel' OR br.RoomStatus IS NULL)
      LEFT JOIN booking AS b
        ON br.BID = b.BID
        AND (b.CheckInDate > CURDATE() OR b.CheckInDate IS NULL)
      WHERE r.RStatus = 'Available'
      GROUP BY r.RTID;
    `);
  }

  /** Full room report (type, id, name, status) */
  async getRoomReport(): Promise<
    { RTID: string; RID: number; RTName: string; RStatus: string }[]
  > {
    return this.dataSource.query(`
      SELECT
        r.RTID,
        r.RID,
        rt.RTName,
        r.RStatus
      FROM room AS r
      JOIN room_type AS rt ON r.RTID = rt.RTID
      ORDER BY r.RTID ASC, r.RID ASC;
    `);
  }
}
