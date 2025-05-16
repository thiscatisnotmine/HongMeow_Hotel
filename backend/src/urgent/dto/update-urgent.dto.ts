import { PartialType } from '@nestjs/mapped-types';
import { CreateUrgentDto } from './create-urgent.dto';

export class UpdateUrgentDto extends PartialType(CreateUrgentDto) {}
