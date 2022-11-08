import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto } from './model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(user: UserDto): Promise<User> {
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
    } else {
      const newUser = new User();
      newUser.id = id;
      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      return this.usersRepository.save(newUser);
    }
  }
}
