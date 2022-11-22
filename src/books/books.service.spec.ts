import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookDto } from './model';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';

describe('BookService', () => {
  let booksService: BooksService;
  let booksRepository: Repository<Book>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {}
        },
        {
          provide: UsersService,
          useValue: {}
        }
      ]
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});