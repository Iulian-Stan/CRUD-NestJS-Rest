import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './model';
import { MyBooksService } from './mybooks.service';

describe('BookService', () => {
  let booksService: MyBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyBooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {}
        }
      ]
    }).compile();

    booksService = module.get<MyBooksService>(MyBooksService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});