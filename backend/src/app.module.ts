import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import all entities
import { Employee } from './entities/employee.entity';
import { Customer } from './entities/customer.entity';
import { Urgent } from './entities/urgent.entity';
import { Pet } from './entities/pet.entity';
import { Room } from './entities/room.entity';
import { RoomType } from './entities/roomtype.entity';
import { Booking } from './entities/booking.entity';
import { BookedRoom } from './entities/bookedroom.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'mysql-db',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'userpassword',
      database: process.env.DB_NAME || 'hongmeow',
      entities: [
        Employee,
        Customer,
        Urgent,
        Pet,
        Room,
        RoomType,
        Booking,
        BookedRoom,
        Payment,
      ],
      synchronize: true, // Auto-create tables - disable in production
    }),
    TypeOrmModule.forFeature([
      Employee,
      Customer,
      Urgent,
      Pet,
      Room,
      RoomType,
      Booking,
      BookedRoom,
      Payment,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
