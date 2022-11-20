import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiVersion } from '../api';
import { Book, BookDto } from './model';
import { BooksService } from './books.service';
import { User } from '../users/model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiVersion('v1.0')
  @ApiResponse({ status: 201, description: 'Book created', type: Book })
  create(@Body() book: BookDto): Promise<Book> {
    return this.booksService.create(book);
  }

  @Get()
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'List of books', type: [Book]})
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'Book found', type: Book })
  @ApiResponse({ status: 400, description: 'Book not found' })
  findOne(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 204, description: 'Book deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }

  @Put(':id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'Book updated', type: Book })
  @ApiResponse({ status: 201, description: 'Book created', type: Book })
  update(@Param('id') id: number, @Body() book: BookDto): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Put('owner/:id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'Book found', type: User })
  @ApiResponse({ status: 404, description: 'Book not found' })
  getOwner(@Param('id') id: number): Promise<User> {
    return this.booksService.getOwner(id);
  }
}
