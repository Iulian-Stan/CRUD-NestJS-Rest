import { Test, TestingModule } from '@nestjs/testing';
import { MyBooksController } from './mybooks.controller';
import { MyBooksService } from './mybooks.service';

describe('MyBooksController', () => {
  let booksController: MyBooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MyBooksController],
      providers: [
        {
          provide: MyBooksService,
          useValue: {}
        }
      ]
    }).compile();

    booksController = app.get<MyBooksController>(MyBooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
});