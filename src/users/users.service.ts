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

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});
    if (user) {
      user.name = userDto.name;
      user.email = userDto.email;
      user.password = await bcrypt.hash(userDto.password, 10);
      return this.usersRepository.save(user);
    } 
    return user;
  }

  async getBooks(id: number): Promise<Book[]> {
    const user = await this.usersRepository.findOne({where: {id: id}, relations: ['books']});
    if (user) {
      return user.books;
    }
    return null;
  }
}
