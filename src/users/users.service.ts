import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto } from './model';
import { Book } from '../books/model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(userDto: UserDto): Promise<User> {
    let user = await this.usersRepository.findOneBy({ email: userDto.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    user.role = userDto.role;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOneBy({email});
  }

  async remove(email: string): Promise<void> {
    await this.usersRepository.delete(email);
  }

  async update(email: string, userDto: UserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (userDto.name) {
      user.name = userDto.name;
    }
    if (userDto.password) {
      user.password = userDto.password;
    }
    if (userDto.role) {
      user.role = userDto.role;
    }
    return this.usersRepository.save(user);
  }

  async getBooks(email: string): Promise<Book[]> {
    const user = await this.usersRepository.findOne({ where: { email }, relations: ['books']});
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user.books;
  }
}
