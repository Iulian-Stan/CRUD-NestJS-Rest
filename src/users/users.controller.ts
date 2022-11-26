import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, UserDto } from './model';
import { UsersService } from './users.service';
import { Book } from '../books/model';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  create(@Body() user: UserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  update(@Param('id') id: number, @Body() user: UserDto): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Get('books/:id')
  @ApiOperation({ summary: 'List user\'s books' })
  @ApiResponse({ status: 200, description: 'User found', type: [Book] })
  @ApiResponse({ status: 404, description: 'User not found' })
  getBooks(@Param('id') id: number) {
    return this.usersService.getBooks(id);
  }
}
