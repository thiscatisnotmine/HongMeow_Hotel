// backend/src/room/room.controller.ts

import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '../entities/room.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('search/:query')
  search(@Param('query') query: string): Promise<Room[]> {
    return this.roomService.searchRooms(query);
  }

  @Put('status')
  updateStatus(
    @Body() body: { RTID: string; RID: number; status: string },
  ): Promise<Room> {
    return this.roomService.updateRoomStatus(body.RTID, body.RID, body.status);
  }

  // Mark a room as out of order
  @Put('report')
  markOutOfOrder(@Body() body: { RTID: string; RID: number }): Promise<Room> {
    return this.roomService.updateRoomStatus(
      body.RTID,
      body.RID,
      'Out of Order',
    );
  }

  // Mark a room back to available
  @Put('repair')
  markAvailable(@Body() body: { RTID: string; RID: number }): Promise<Room> {
    return this.roomService.updateRoomStatus(body.RTID, body.RID, 'Available');
  }

  @Get('available')
  getAvailable(): Promise<{ RTID: string; AvailableRooms: number }[]> {
    return this.roomService.findAvailableByType();
  }

  @Get('report')
  getFullReport(): Promise<
    { RTID: string; RID: number; RTName: string; RStatus: string }[]
  > {
    return this.roomService.getRoomReport();
  }
}
