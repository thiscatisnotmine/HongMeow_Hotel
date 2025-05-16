/* --- Begin hong-meow-hotel/backend/test/room.e2e-spec.ts --- */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RoomService } from '../src/room/room.service';

describe('Room Endpoints (e2e)', () => {
  let app: INestApplication;
  let roomService: RoomService;

  const testRoom = { RTID: 'RT101', RID: 101 };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    roomService = moduleFixture.get(RoomService);
    app = moduleFixture.createNestApplication();
    await app.init();

    // Ensure room exists before testing
    await roomService.setRoomStatus(testRoom.RTID, testRoom.RID, 'Available');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/room/report (GET) - should return list of room status', async () => {
    const res = await request(app.getHttpServer()).get('/room/report');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/room/report (PUT) - should mark room as Out of Order', async () => {
    const res = await request(app.getHttpServer())
      .put('/room/report')
      .send({ RTID: testRoom.RTID, RID: testRoom.RID });

    expect(res.status).toBe(200);
    expect(res.body.RStatus).toBe('Out of Order');
  });

  it('/room/repair (PUT) - should mark room as Available', async () => {
    const res = await request(app.getHttpServer())
      .put('/room/repair')
      .send({ RTID: testRoom.RTID, RID: testRoom.RID });

    expect(res.status).toBe(200);
    expect(res.body.RStatus).toBe('Available');
  });
});
/* --- End hong-meow-hotel/backend/test/room.e2e-spec.ts --- */
