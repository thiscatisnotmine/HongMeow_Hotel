import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto';
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';

@Controller('roomtype')
export class RoomtypeController {
  constructor(private readonly roomtypeService: RoomtypeService) {}

  @Post()
  create(@Body() createRoomtypeDto: CreateRoomtypeDto) {
    return this.roomtypeService.create(createRoomtypeDto);
  }

  @Get()
  findAll() {
    return this.roomtypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomtypeService.findOne(id); // ← removed “+”
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoomtypeDto) {
    return this.roomtypeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomtypeService.remove(id);
  }
}
