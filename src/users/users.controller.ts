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

  @Get(':email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('email') email: string): Promise<void> {
    return this.usersService.remove(email);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  update(@Param('email') email: string, @Body() user: UserDto): Promise<User> {
    return this.usersService.update(email, user);
  }

  @Get('books/:email')
  @ApiOperation({ summary: 'List user\'s books' })
  @ApiResponse({ status: 200, description: 'User found', type: [Book] })
  @ApiResponse({ status: 404, description: 'User not found' })
  getBooks(@Param('email') email: string) {
    return this.usersService.getBooks(email);
  }
}
