import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { User, UserDto } from './model';
import { UsersService } from './users.service';
import { Book } from '../books/model';
import { ExceptionsFilter } from '../exceptions/exceptions.filter';

@UseFilters(ExceptionsFilter)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'New user created', type: User })
  @ApiResponse({ status: 400, description: 'Could not create new user' })
  create(@Body() user: UserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiResponse({ status: 200, description: 'User data', type: User })
  findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User was deleted' })
  remove(@Param('email') email: string): Promise<void> {
    return this.usersService.remove(email);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User data updated', type: User })
  @ApiResponse({ status: 400, description: 'Could not update user' })
  update(@Param('email') email: string, @Body() user: UserDto): Promise<User> {
    return this.usersService.update(email, user);
  }

  @Get(':email/books')
  @ApiOperation({ summary: 'List user\'s books' })
  @ApiResponse({ status: 200, description: 'List of user\'s books', type: [Book] })
  @ApiResponse({ status: 400, description: 'Could not get user\'s books' })
  getBooks(@Param('email') email: string): Promise<Book[]> {
    return this.usersService.getBooks(email);
  }
}
