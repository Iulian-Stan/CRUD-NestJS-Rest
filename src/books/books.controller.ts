import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book, BookDto } from './model';
import { BooksService } from './books.service';
import { User } from '../users/model';
import { ExceptionsFilter } from '../exceptions/exceptions.filter';
import { Auth } from '../auth/decorators'; 

@UseFilters(ExceptionsFilter)
@Auth('admin')
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({ status: 201, description: 'Created book created', type: Book })
  create(@Body() book: BookDto): Promise<Book> {
    return this.booksService.create(book);
  }

  @Get()
  @ApiOperation({ summary: 'List all books' })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book]})
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find book by id' })
  @ApiResponse({ status: 200, description: 'Book data if book is found', type: Book })
  findOne(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  @ApiResponse({ status: 200, description: 'Book was deleted if found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({ status: 200, description: 'Updated book data if book is found', type: Book })
  update(@Param('id') id: number, @Body() book: BookDto): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Get(':id/owner')
  @ApiOperation({ summary: 'Find book\'s owner' })
  @ApiResponse({ status: 200, description: 'Users data if book is found', type: User })
  getOwner(@Param('id') id: number): Promise<User> {
    return this.booksService.getOwner(id);
  }
}
