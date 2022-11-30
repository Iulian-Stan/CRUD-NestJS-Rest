import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './model';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';

describe('BookService', () => {
  let booksService: BooksService;

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
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});