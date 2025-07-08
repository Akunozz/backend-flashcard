import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '../../generated/prisma/index';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  create(
    @Body() body: { name: string; email: string; password: string; role: Role },
  ) {
    return this.usersService.createUser(
      body.name,
      body.email,
      body.password,
      body.role as Role,
    );
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string; role: Role },) {
    const user = await this.usersService.login(
      body.email,
      body.password,
      body.role as Role,
    );
    return this.authService.login(user);
  }
}
