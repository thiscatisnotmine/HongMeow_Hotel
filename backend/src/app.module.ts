/* --- Begin hong-meow-hotel/backend/src/app.module.ts --- */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entity imports
import { Employee } from './entities/employee.entity';
import { Customer } from './entities/customer.entity';
import { Urgent } from './entities/urgent.entity';
import { Pet } from './entities/pet.entity';
import { Room } from './entities/room.entity';
import { RoomType } from './entities/roomtype.entity';
import { Booking } from './entities/booking.entity';
import { BookedRoom } from './entities/bookedroom.entity';
import { Payment } from './entities/payment.entity';

// Module imports
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { PetModule } from './pet/pet.module';
import { BookingModule } from './booking/booking.module';
import { BookedroomModule } from './bookedroom/bookedroom.module'; // ✅ Fixed import name
import { PaymentModule } from './payment/payment.module';
import { RoomModule } from './room/room.module';
import { RoomtypeModule } from './roomtype/roomtype.module'; // ✅ Fixed import name
import { UrgentModule } from './urgent/urgent.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'mariadb',
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
      synchronize: true, // set false on production
      dropSchema: true, // This will drop all tables before creating new ones
      migrationsRun: true,
    }),

    // Feature modules
    CustomerModule,
    EmployeeModule,
    PetModule,
    BookingModule,
    BookedroomModule, // ✅ Matches export in bookedroom.module.ts
    PaymentModule,
    RoomModule,
    RoomtypeModule, // ✅ Matches export in roomtype.module.ts
    UrgentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
/* --- End hong-meow-hotel/backend/src/app.module.ts --- */
