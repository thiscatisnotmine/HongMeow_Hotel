// backend/src/seeder/seed.ts
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
  const custRepo = dataSource.getRepository(Customer);
  const urgentRepo = dataSource.getRepository(Urgent);
  const petRepo = dataSource.getRepository(Pet);
  const roomTypeRepo = dataSource.getRepository(RoomType);
  const roomRepo = dataSource.getRepository(Room);
  const bookingRepo = dataSource.getRepository(Booking);
  const bookedRoomRepo = dataSource.getRepository(BookedRoom);
  const paymentRepo = dataSource.getRepository(Payment);

  // helper to format dates as YYYY-MM-DD
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const today = new Date();
  const yesterday = new Date(today.getTime() - 864e5);
  const tomorrow = new Date(today.getTime() + 864e5);
  const dayAfter = new Date(today.getTime() + 2 * 864e5);

  // 1) Admin
  await empRepo.save(
    empRepo.create({
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
    }),
  );

  // 2) Customer
  const customer = await custRepo.save(
    custRepo.create({
      CusCID: '2222222222222',
      CusFname: 'Jane',
      CusLname: 'Doe',
      CusPhone: '0888888888',
      CusEmail: 'jane@customer.com',
    }),
  );

  // 3) Emergency contact
  await urgentRepo.save(
    urgentRepo.create({
      CusCID: customer.CusCID,
      UrFname: 'Alice',
      UrLname: 'Smith',
      UrRelationship: 'Friend',
      UrPhone: '0777777777',
      customer,
    }),
  );

  // 4) Pets
  const [fluffy, barky] = await petRepo.save([
    petRepo.create({
      CusCID: customer.CusCID,
      PName: 'Fluffy',
      PType: 'cat',
      PBreeds: 'Persian',
      PAge: 24,
      PVaccine: false,
      PDisease: 'None',
      customer,
    }),
    petRepo.create({
      CusCID: customer.CusCID,
      PName: 'Barky',
      PType: 'dog',
      PBreeds: 'Beagle',
      PAge: 12,
      PVaccine: false,
      PDisease: 'Skin allergy',
      customer,
    }),
  ]);

  // 5) Room types
  const [catType, dogType] = await roomTypeRepo.save([
    roomTypeRepo.create({
      RTID: 'CAD',
      RTName: 'Cat Deluxe',
      RTDescription: 'Deluxe room for cats',
      RTMax: 2,
      RTPrice: 300,
      RTAmount: 2,
    }),
    roomTypeRepo.create({
      RTID: 'DAD',
      RTName: 'Dog Deluxe',
      RTDescription: 'Deluxe room for dogs',
      RTMax: 2,
      RTPrice: 350,
      RTAmount: 2,
    }),
  ]);

  // 6) Rooms
  const rooms = await roomRepo.save([
    roomRepo.create({
      RID: 1,
      RTID: catType.RTID,
      RState: 'Available',
      roomType: catType,
    }),
    roomRepo.create({
      RID: 2,
      RTID: catType.RTID,
      RState: 'Available',
      roomType: catType,
    }),
    roomRepo.create({
      RID: 3,
      RTID: dogType.RTID,
      RState: 'Available',
      roomType: dogType,
    }),
    roomRepo.create({
      RID: 4,
      RTID: dogType.RTID,
      RState: 'Available',
      roomType: dogType,
    }),
  ]);

  // 7) Four bookings, in different statuses/dates
  const bookings = await bookingRepo.save([
    // A) waiting, yesterday → yesterday
    bookingRepo.create({
      CusCID: customer.CusCID,
      CheckInDate: fmt(yesterday),
      CheckOutDate: fmt(yesterday),
      Duration: 1,
      RoomAmount: 1,
      BookingStatus: 'waiting',
    }),
    // B) check-in, spans yesterday → tomorrow
    bookingRepo.create({
      CusCID: customer.CusCID,
      CheckInDate: fmt(yesterday),
      CheckOutDate: fmt(tomorrow),
      Duration: 2,
      RoomAmount: 1,
      BookingStatus: 'check-in',
    }),
    // C) check-out, yesterday → yesterday
    bookingRepo.create({
      CusCID: customer.CusCID,
      CheckInDate: fmt(yesterday),
      CheckOutDate: fmt(yesterday),
      Duration: 1,
      RoomAmount: 1,
      BookingStatus: 'check-out',
    }),
    // D) waiting, tomorrow → dayAfter
    bookingRepo.create({
      CusCID: customer.CusCID,
      CheckInDate: fmt(tomorrow),
      CheckOutDate: fmt(dayAfter),
      Duration: 1,
      RoomAmount: 1,
      BookingStatus: 'waiting',
    }),
  ]);

  // 8) BookedRooms (array‐create, numeric PID)
  const bookedRooms = bookedRoomRepo.create([
    {
      BID: bookings[0].BID,
      RTID: catType.RTID,
      RID: rooms[0].RID,
      PID: fluffy.PID,
      RoomStatus: 'booked',
      booking: bookings[0],
      roomType: catType,
      room: rooms[0],
      pet: fluffy,
    },
    {
      BID: bookings[1].BID,
      RTID: dogType.RTID,
      RID: rooms[2].RID,
      PID: barky.PID,
      RoomStatus: 'booked',
      booking: bookings[1],
      roomType: dogType,
      room: rooms[2],
      pet: barky,
    },
    {
      BID: bookings[2].BID,
      RTID: catType.RTID,
      RID: rooms[1].RID,
      PID: fluffy.PID,
      RoomStatus: 'booked',
      booking: bookings[2],
      roomType: catType,
      room: rooms[1],
      pet: fluffy,
    },
    {
      BID: bookings[3].BID,
      RTID: dogType.RTID,
      RID: rooms[3].RID,
      PID: barky.PID,
      RoomStatus: 'booked',
      booking: bookings[3],
      roomType: dogType,
      room: rooms[3],
      pet: barky,
    },
  ]);
  await bookedRoomRepo.save(bookedRooms);

  // 9) Payments (mix of Paid/Pending & various statuses)
  await paymentRepo.save([
    paymentRepo.create({
      BID: bookings[0].BID,
      CusCID: customer.CusCID,
      PayTotal: 100,
      PayMethod: 'Cash',
      PayStatus: 'Pending',
      PayDate: null,
      booking: bookings[0],
      customer,
    }),
    paymentRepo.create({
      BID: bookings[1].BID,
      CusCID: customer.CusCID,
      PayTotal: 200,
      PayMethod: 'Card',
      PayStatus: 'Paid',
      PayDate: new Date(),
      booking: bookings[1],
      customer,
    }),
    paymentRepo.create({
      BID: bookings[2].BID,
      CusCID: customer.CusCID,
      PayTotal: 100,
      PayMethod: 'Cash',
      PayStatus: 'Paid',
      PayDate: new Date(),
      booking: bookings[2],
      customer,
    }),
    paymentRepo.create({
      BID: bookings[3].BID,
      CusCID: customer.CusCID,
      PayTotal: 100,
      PayMethod: 'Transfer',
      PayStatus: 'Pending',
      PayDate: null,
      booking: bookings[3],
      customer,
    }),
  ]);

  console.log('✅ Demo data seeded: 4 bookings, pets, rooms, payments, etc.');
}
