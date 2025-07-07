import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.login(email, password);
    return user;
  }

  async login(user: any) {
    const payload = { email: user.user.email, sub: user.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
