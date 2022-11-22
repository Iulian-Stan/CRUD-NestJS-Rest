import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userDto: UserDto = {
  name: 'name #1',
  email: 'email #1',
  password: 'pass #1'
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
            create: jest
              .fn()
              .mockImplementation((user: UserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'name #1',
                email: 'email #1',
                password: 'pass #1'
              },
              {
                name: 'name #2',
                email: 'email #2',
                password: 'pass #1'
              }
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                name: 'name #1',
                email: 'email #1',
                password: 'pass #1',
                id
              })
            ),
            remove: jest.fn(),
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
      expect(usersController.create(userDto)).resolves.toEqual({
        id: 1,
        ...userDto
      });
      expect(usersService.create).toHaveBeenCalled();
      expect(usersService.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      usersController.findOne(1);
      expect(usersService.findOne).toHaveBeenCalled();
      expect(usersController.findOne(1)).resolves.toEqual({
        id: 1,
        ...userDto
      });
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove(2);
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});