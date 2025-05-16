/* --- Begin hong-meow-hotel/backend/src/room/room.controller.ts --- */
import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('search/:query')
  getRoomsByQuery(@Param('query') query: string): Promise<Room[]> {
    return this.roomService.searchRooms(query);
  }

  @Put('status')
  updateRoomStatus(
    @Body() body: { room_code: string; room_number: number; status: string },
  ): Promise<Room> {
    return this.roomService.updateRoomStatus(
      body.room_code,
      body.room_number,
      body.status,
    );
  }

  @Get('available')
  findAvailableByType() {
    return this.roomService.findAvailableByType();
  }

  @Get('report')
  getRoomReport() {
    return this.roomService.getRoomReport();
  }

  @Put('report')
  markRoomOutOfOrder(@Body() body: { RTID: string; RID: number }) {
    return this.roomService.setRoomStatus(body.RTID, body.RID, 'Out of Order');
  }

  @Put('repair')
  markRoomAvailable(@Body() body: { RTID: string; RID: number }) {
    return this.roomService.setRoomStatus(body.RTID, body.RID, 'Available');
  }
}
/* --- End hong-meow-hotel/backend/src/room/room.controller.ts --- */
