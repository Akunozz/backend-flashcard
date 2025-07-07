import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  create(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.createUser(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.login(body.email, body.password);
    return this.authService.login(user);
  }
}
