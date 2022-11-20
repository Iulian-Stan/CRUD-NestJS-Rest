import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookDto } from './model';
import { User } from '../users/model';
import { UsersService } from '../users/users.service';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    private usersService: UsersService) {}

  async create(bookDto: BookDto): Promise<Book> {
    const { title, description , userID } = bookDto;
    const book = new Book();
    book.title = title;
    book.description = description;
    book.owner = await this.usersService.findOne(userID);
    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async update(id: number, book: BookDto): Promise<Book> {
    const oldBook = await this.booksRepository.findOneBy({ id });
    if (oldBook) {
      oldBook.title = book.title;
      oldBook.description = book.description;
      oldBook.owner = await this.usersService.findOne(book.userID);
      return this.booksRepository.save(oldBook);
    }
    return oldBook;
  }

  async getOwner(id: number): Promise<User> {
    const book = await this.booksRepository.findOneBy({ id });
    if (book) {
      return book.owner;
    }
    return null;
  }
}
