// src/seeder/seed.ts
import { DataSource } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Customer } from '../entities/customer.entity';
import { Urgent } from '../entities/urgent.entity';
import { Pet } from '../entities/pet.entity';
import { RoomType } from '../entities/roomtype.entity';
import { Room } from '../entities/room.entity';
import { Booking } from '../entities/booking.entity';
import { BookedRoom } from '../entities/bookedroom.entity';
import { Payment } from '../entities/payment.entity';

export async function seedData(dataSource: DataSource) {
  const empRepo = dataSource.getRepository(Employee);
  const customerRepo = dataSource.getRepository(Customer);
  const urgentRepo = dataSource.getRepository(Urgent);
  const petRepo = dataSource.getRepository(Pet);
  const roomTypeRepo = dataSource.getRepository(RoomType);
  const roomRepo = dataSource.getRepository(Room);
  const bookingRepo = dataSource.getRepository(Booking);
  const bookedRoomRepo = dataSource.getRepository(BookedRoom);
  const paymentRepo = dataSource.getRepository(Payment);

  // Seed Employee
  const admin = empRepo.create({
    EmpCID: '1111111111111',
    EmpFname: 'Admin',
    EmpLname: 'User',
    EmpRole: 'admin',
    EmpBirth: '1990-01-01',
    EmpAge: 34,
    EmpPhone: '0999999999',
    EmpEmail: 'admin@hongmeow.com',
    EmpAddress: '123 Admin St',
    EmpUsername: 'admin',
    EmpPassword: 'password123',
  });
  await empRepo.save(admin);

  // Seed Customer
  const customer = customerRepo.create({
    CusCID: '2222222222222',
    CusFname: 'Jane',
    CusLname: 'Doe',
    CusPhone: '0888888888',
    CusEmail: 'jane@customer.com',
  });
  await customerRepo.save(customer);

  // Seed Urgent Contact
  const urgent = urgentRepo.create({
    CusCID: customer.CusCID,
    UrFname: 'Alice',
    UrLname: 'Smith',
    UrRelationship: 'Friend',
    UrPhone: '0777777777',
    customer: customer,
  });
  await urgentRepo.save(urgent);

  // Seed Pets
  const pet1 = petRepo.create({
    PID: 'P001',
    CusCID: customer.CusCID,
    PName: 'Fluffy',
    PType: 'cat',
    PBreeds: 'Persian',
    PAge: 24,
    PVaccine: 'vaccine-fluffy.pdf',
    PDisease: 'None',
    customer: customer,
  });

  const pet2 = petRepo.create({
    PID: 'P002',
    CusCID: customer.CusCID,
    PName: 'Barky',
    PType: 'dog',
    PBreeds: 'Beagle',
    PAge: 12,
    PVaccine: 'vaccine-barky.pdf',
    PDisease: 'Skin allergy',
    customer: customer,
  });

  await petRepo.save([pet1, pet2]);

  // Seed Room Types
  const catRoomType = roomTypeRepo.create({
    RTID: 'CAD',
    RTName: 'Cat Deluxe',
    RTDescription: 'Deluxe room for cats',
    RTMax: 2,
    RTPrice: 300,
    RTAmount: 2,
  });

  const dogRoomType = roomTypeRepo.create({
    RTID: 'DAD',
    RTName: 'Dog Deluxe',
    RTDescription: 'Deluxe room for dogs',
    RTMax: 2,
    RTPrice: 350,
    RTAmount: 2,
  });

  await roomTypeRepo.save([catRoomType, dogRoomType]);

  // Seed Rooms
  const rooms = roomRepo.create([
    {
      RID: 1,
      RTID: catRoomType.RTID,
      RState: 'Available',
      roomType: catRoomType,
    },
    {
      RID: 2,
      RTID: catRoomType.RTID,
      RState: 'Available',
      roomType: catRoomType,
    },
    {
      RID: 3,
      RTID: dogRoomType.RTID,
      RState: 'Available',
      roomType: dogRoomType,
    },
    {
      RID: 4,
      RTID: dogRoomType.RTID,
      RState: 'Available',
      roomType: dogRoomType,
    },
  ]);

  await roomRepo.save(rooms);

  // Seed Booking
  const booking = bookingRepo.create({
    BID: 'B001',
    CusCID: customer.CusCID,
    CheckInDate: '2025-05-15',
    CheckOutDate: '2025-05-18',
    Duration: 3,
    RoomAmount: 2,
    customer: customer,
  });
  await bookingRepo.save(booking);

  // Seed Booked Rooms
  const bookedRooms = bookedRoomRepo.create([
    {
      BID: booking.BID,
      RTID: catRoomType.RTID,
      RID: 1,
      PID: pet1.PID,
      RoomStatus: 'booked',
      booking: booking,
      roomType: catRoomType,
      room: rooms[0],
      pet: pet1,
    },
    {
      BID: booking.BID,
      RTID: dogRoomType.RTID,
      RID: 3,
      PID: pet2.PID,
      RoomStatus: 'booked',
      booking: booking,
      roomType: dogRoomType,
      room: rooms[2],
      pet: pet2,
    },
  ]);
  await bookedRoomRepo.save(bookedRooms);

  // Seed Payment
  const payment = paymentRepo.create({
    BID: booking.BID,
    CusCID: customer.CusCID,
    PayTotal: 1950,
    PayMethod: 'Cash',
    PayDate: '2025-05-14',
    PayStatus: 'Paid',
    booking: booking,
    customer: customer,
  });
  await paymentRepo.save(payment);

  console.log('✅ All data seeded successfully');
}
