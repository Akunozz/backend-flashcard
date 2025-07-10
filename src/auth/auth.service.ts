import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, role: string) {
    const user = await this.usersService.login(email, password, role);
    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.user.email,
      sub: user.user.id,
      role: user.user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        role: user.user.role,
      },
      messagem: 'Login realizado com sucesso',
    };
  }
}
