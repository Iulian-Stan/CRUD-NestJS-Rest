import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {}
        }
      ]
    }).compile();

    booksController = app.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
});