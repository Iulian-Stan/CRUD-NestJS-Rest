import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book, MyBookDto } from './model';
import { MyBooksService } from './mybooks.service';
import { User } from '../users/model';
import { ExceptionsFilter } from '../exceptions/exceptions.filter';
import { Auth } from '../auth/decorators';
import { CurrentUser } from '../auth/decorators/user.decorator';

@UseFilters(ExceptionsFilter)
@Auth('user')
@ApiTags('mybooks')
@Controller('mybooks')
export class MyBooksController {
  constructor(private readonly booksService: MyBooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({ status: 201, description: 'Created book created', type: Book })
  create(@Body() book: MyBookDto, @CurrentUser() user: User): Promise<Book> {
    return this.booksService.create(book, user);
  }

  @Get()
  @ApiOperation({ summary: 'List all books' })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book]})
  findAll(@CurrentUser() user: User): Promise<Book[]> {
    return this.booksService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find book by id' })
  @ApiResponse({ status: 200, description: 'Book data if book is found', type: Book })
  findOne(@Param('id') id: number, @CurrentUser() user: User): Promise<Book> {
    return this.booksService.findOne(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  @ApiResponse({ status: 200, description: 'Book was deleted if found' })
  remove(@Param('id') id: number, @CurrentUser() user: User): Promise<void> {
    return this.booksService.remove(id, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({ status: 200, description: 'Updated book data if book is found', type: Book })
  update(@Param('id') id: number, @Body() book: MyBookDto, @CurrentUser() user: User): Promise<Book> {
    return this.booksService.update(id, book, user);
  }
}