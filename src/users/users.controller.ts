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
  @ApiResponse({ status: 201, description: 'Created user data', type: User })
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
  @ApiResponse({ status: 200, description: 'User data if user is found', type: User })
  async findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User was deleted if found' })
  remove(@Param('email') email: string): Promise<void> {
    return this.usersService.remove(email);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Updated user data if user is found', type: User })
  update(@Param('email') email: string, @Body() user: UserDto): Promise<User> {
    return this.usersService.update(email, user);
  }

  @Get('books/:email')
  @ApiOperation({ summary: 'List user\'s books' })
  @ApiResponse({ status: 200, description: 'List of books if user is found', type: [Book] })
  getBooks(@Param('email') email: string) {
    return this.usersService.getBooks(email);
  }
}
