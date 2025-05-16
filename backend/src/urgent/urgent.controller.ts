import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UrgentService } from './urgent.service';
import { CreateUrgentDto } from './dto/create-urgent.dto';
import { UpdateUrgentDto } from './dto/update-urgent.dto';

@Controller('urgent')
export class UrgentController {
  constructor(private readonly urgentService: UrgentService) {}

  @Post()
  create(@Body() createUrgentDto: CreateUrgentDto) {
    return this.urgentService.create(createUrgentDto);
  }

  @Get()
  findAll() {
    return this.urgentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urgentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrgentDto: UpdateUrgentDto) {
    return this.urgentService.update(+id, updateUrgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urgentService.remove(+id);
  }
}
