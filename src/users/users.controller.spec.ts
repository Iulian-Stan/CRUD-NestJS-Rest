import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const user1Dto: UserDto = {
  name: 'name #1',
  email: 'email #1',
  password: 'pass #1'
};

const user2Dto: UserDto = {
  name: 'name #2',
  email: 'email #2',
  password: 'pass #2'
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(user1Dto),
            findAll: jest.fn().mockResolvedValue([user1Dto, user2Dto]),
            findOne: jest.fn().mockResolvedValue(user1Dto),
            remove: jest.fn(),
            update: jest.fn().mockResolvedValue(user2Dto)
          }
        }
      ]
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(usersController.create(user1Dto)).resolves.toEqual(user1Dto);
      expect(usersService.create).toHaveBeenCalledWith(user1Dto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      expect(usersController.findAll()).resolves.toEqual([user1Dto, user2Dto]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne(1)).resolves.toEqual(user1Dto);
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove(2);
      expect(usersService.remove).toBeCalledWith(2);
    });
  });

  describe('update()', () => {
    it('should update a user', () => {
      expect(usersController.update(1, user2Dto)).resolves.toEqual(user2Dto);
      expect(usersService.update).toBeCalledWith(1, user2Dto);
    });
  });
});