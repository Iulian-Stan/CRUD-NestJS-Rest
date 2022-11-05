import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDto } from './model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(user: UserDto): Promise<void> {
    await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }


  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }

  async update(id: number, user: UserDto): Promise<void> {
    const old_user = await this.usersRepository.findOneBy({id});
    if (old_user) {
      old_user.first_name = user.first_name;
      old_user.last_name = user.last_name;
      await this.usersRepository.save(old_user);
    } else {
      const new_user = new User();
      new_user.id = id;
      new_user.first_name = user.first_name;
      new_user.last_name = user.last_name;
      await this.usersRepository.save(new_user);
    }
  }
}
