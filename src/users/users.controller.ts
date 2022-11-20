import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiVersion } from '../api';
import { User, UserDto } from './model';
import { UsersService } from './users.service';
import { Book } from '../books/model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiVersion('v1.0')
  @ApiResponse({ status: 201, description: 'User created', type: User })
  create(@Body() user: UserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  update(@Param('id') id: number, @Body() user: UserDto): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Get('books/:id')
  @ApiVersion('v1.0')
  @ApiResponse({ status: 200, description: 'User found', type: [Book] })
  @ApiResponse({ status: 404, description: 'User not found' })
  getBooks(@Param('id') id: number) {
    return this.usersService.getBooks(id);
  }
}
