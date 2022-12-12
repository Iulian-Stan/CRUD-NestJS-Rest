import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, JwtTokenDto } from './model';
import { UsersService } from '../users/users.service';
import { User } from '../users/model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<void> {
    await this.usersService.create({ ...registerDto, role: undefined });
  }

  async login(loginDto: LoginDto): Promise<JwtTokenDto> {
    const user = await this.usersService.findOne(loginDto.email);
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const payload = { email: user.email, pass: user.password };
      return { access_token: this.jwtService.sign(payload) };
    }
    return null;
  }
}