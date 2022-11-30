import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto } from './model';
import { Book } from '../books/model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = await bcrypt.hash(userDto.password, 10);
    user.books = [];
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
    const user = await this.usersRepository.findOneBy({email});
    if (user) {
      user.name = userDto.name;
      user.email = userDto.email;
      user.password = await bcrypt.hash(userDto.password, 10);
      return this.usersRepository.save(user);
    } 
    return user;
  }

  async getBooks(email: string): Promise<Book[]> {
    const user = await this.usersRepository.findOne({where: {email}, relations: ['books']});
    if (user) {
      return user.books;
    }
    return null;
  }
}
