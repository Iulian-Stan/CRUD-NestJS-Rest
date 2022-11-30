import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(authDto: AuthDto): Promise<any> {
    const user = await this.validateUser(authDto.email, authDto.password);
    if (user) {
      const payload = { email: user.email, pass: user.password };
      return { access_token: this.jwtService.sign(payload) };
    }
    return null;
  }
}