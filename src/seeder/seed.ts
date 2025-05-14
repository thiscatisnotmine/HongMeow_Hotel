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
  if ((await empRepo.count()) === 0) {
    await empRepo.insert([
      {
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
      },
    ]);
    console.log('✅ Seeded Employee');
  }

  // Seed Customer
  if ((await customerRepo.count()) === 0) {
    await customerRepo.insert([
      {
        CusCID: '2222222222222',
        CusFname: 'Jane',
        CusLname: 'Doe',
        CusPhone: '0888888888',
        CusEmail: 'jane@customer.com',
      },
    ]);
    console.log('✅ Seeded Customer');
  }

  // Seed Urgent Contact
  if ((await urgentRepo.count()) === 0) {
    await urgentRepo.insert([
      {
        CusCID: '2222222222222',
        UrFname: 'Alice',
        UrLname: 'Smith',
        UrRelationship: 'Friend',
        UrPhone: '0777777777',
      },
    ]);
    console.log('✅ Seeded Urgent Contact');
  }

  // Seed Pets
  if ((await petRepo.count()) === 0) {
    await petRepo.insert([
      {
        PID: 'P001',
        CusCID: '2222222222222',
        PName: 'Fluffy',
        PType: 'cat',
        PBreeds: 'Persian',
        PAge: 24,
        PVaccine: 'vaccine-fluffy.pdf',
        PDisease: 'None',
      },
      {
        PID: 'P002',
        CusCID: '2222222222222',
        PName: 'Barky',
        PType: 'dog',
        PBreeds: 'Beagle',
        PAge: 12,
        PVaccine: 'vaccine-barky.pdf',
        PDisease: 'Skin allergy',
      },
    ]);
    console.log('✅ Seeded Pets');
  }

  // Seed Room Types
  if ((await roomTypeRepo.count()) === 0) {
    await roomTypeRepo.insert([
      {
        RTID: 'CAD',
        RTName: 'Cat Deluxe',
        RTDescription: 'Deluxe room for cats',
        RTMax: 2,
        RTPrice: 300,
        RTAmount: 2,
      },
      {
        RTID: 'DAD',
        RTName: 'Dog Deluxe',
        RTDescription: 'Deluxe room for dogs',
        RTMax: 2,
        RTPrice: 350,
        RTAmount: 2,
      },
    ]);
    console.log('✅ Seeded RoomTypes');
  }

  // Seed Rooms
  if ((await roomRepo.count()) === 0) {
    await roomRepo.insert([
      { RID: 1, RTID: 'CAD', RState: 'Available' },
      { RID: 2, RTID: 'CAD', RState: 'Available' },
      { RID: 3, RTID: 'DAD', RState: 'Available' },
      { RID: 4, RTID: 'DAD', RState: 'Available' },
    ]);
    console.log('✅ Seeded Rooms');
  }

  // Seed Booking
  if ((await bookingRepo.count()) === 0) {
    await bookingRepo.insert([
      {
        BID: 'B001',
        CusCID: '2222222222222',
        CheckInDate: '2025-05-15',
        CheckOutDate: '2025-05-18',
        Duration: 3,
        RoomAmount: 2,
      },
    ]);
    console.log('✅ Seeded Booking');
  }

  // Seed BookedRoom
  if ((await bookedRoomRepo.count()) === 0) {
    await bookedRoomRepo.insert([
      {
        BID: 'B001',
        RTID: 'CAD',
        RID: 1,
        PID: 'P001',
        RoomStatus: 'booked',
      },
      {
        BID: 'B001',
        RTID: 'DAD',
        RID: 3,
        PID: 'P002',
        RoomStatus: 'booked',
      },
    ]);
    console.log('✅ Seeded Booked Rooms');
  }

  // Seed Payment
  if ((await paymentRepo.count()) === 0) {
    await paymentRepo.insert([
      {
        BID: 'B001',
        CusCID: '2222222222222',
        PayTotal: 1950,
        PayMethod: 'Cash',
        PayDate: '2025-05-14',
        PayStatus: 'Paid',
      },
    ]);
    console.log('✅ Seeded Payment');
  }
}
