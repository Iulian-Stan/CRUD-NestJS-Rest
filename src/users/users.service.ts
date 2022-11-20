import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto } from './model';
import { Book } from '../books/model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(userDto: UserDto): Promise<User> {
    const { firstName, lastName } = userDto;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
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

  async update(id: number, user: UserDto): Promise<User> {
    const oldUser = await this.usersRepository.findOneBy({id});
    if (oldUser) {
      oldUser.firstName = user.firstName;
      oldUser.lastName = user.lastName;
      return this.usersRepository.save(oldUser);
    } 
    return oldUser;
  }

  async getBooks(id: number): Promise<Book[]> {
    const user = await this.usersRepository.findOne({where: {id: id}, relations: ['books']});
    if (user) {
      return user.books;
    }
    return null;
  }
}
