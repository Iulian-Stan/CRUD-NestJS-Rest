import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, MyBookDto } from './model';
import { User } from '../users/model';
import { UsersService } from '../users/users.service';


@Injectable()
export class MyBooksService {
  constructor(@InjectRepository(Book) private readonly booksRepository: Repository<Book>) {}

  create(bookDto: MyBookDto, user: User): Promise<Book> {
    const book = new Book();
    book.title = bookDto.title;
    book.author = bookDto.author;
    book.description = bookDto.description;
    book.owner = user;
    return this.booksRepository.save(book);
  }

  findAll(user: User): Promise<Book[]> {
    return this.booksRepository.findBy({ owner: { email: user.email }});
  }

  findOne(id: number, user: User): Promise<Book> {
    return this.booksRepository.findOneBy({ id: id, owner: { email: user.email } });
  }

  async remove(id: number, user: User): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async update(id: number, bookDto: MyBookDto, user: User): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id: id, owner: { email: user.email } });
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    if (bookDto.title) {
      book.title = bookDto.title;
    }
    if (bookDto.author) {
      book.author = bookDto.author;
    }
    if (bookDto.description) {
      book.description = bookDto.description;
    }
    return this.booksRepository.save(book);
  }
}
