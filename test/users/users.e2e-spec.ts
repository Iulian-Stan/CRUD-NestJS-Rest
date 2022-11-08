import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { UserDto } from '../../src/users/model';

describe('Users - /users (e2e)', () => {
  const users = {
    id: 1,
    firstName: 'FirstName #1',
    lastName: 'LastName #1'
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          autoLoadEntities: true,
          synchronize: true
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /users]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(users as UserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(users);
      });
  });

  it('Get all users [GET /users]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /users/:id]', () => {
    return request(app.getHttpServer())
      .get('/users/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});