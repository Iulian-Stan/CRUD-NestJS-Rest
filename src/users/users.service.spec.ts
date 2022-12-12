import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto, UserRole } from './model';
import { UsersService } from './users.service';

const usersArray: UserDto[] = [
  {
    name: 'name #1',
    email: 'email #1',
    password: 'pass #1',
    role: UserRole.USER
  },
  {
    name: 'name #2',
    email: 'email #1',
    password: 'pass #2',
    role: UserRole.ADMIN
  }
];

const oneUser: UserDto = {
  name: 'name #1',
  email: 'email #1',
  password: 'pass #1',
  role: UserRole.USER
};

const email = 'email';

describe('UserService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(oneUser),
            find: jest.fn().mockResolvedValue(usersArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const retVal = await usersService.create(oneUser);
      expect(retVal).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await usersService.findAll();
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(usersRepository, 'findOneBy');
      expect(usersService.findOne(email)).resolves.toEqual(oneUser);
      expect(findSpy).toHaveBeenCalledWith({ email });
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const removeSpy = jest.spyOn(usersRepository, 'delete');
      const retVal = await usersService.remove(email);
      expect(removeSpy).toHaveBeenCalledWith(email);
      expect(retVal).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should update a user', async () => {
      const findSpy = jest.spyOn(usersRepository, 'findOneBy');
      const retVal = await usersService.update(email, oneUser);
      expect(findSpy).toHaveBeenCalledWith({ email });
      expect(retVal).toEqual(oneUser);
    });
  });
});