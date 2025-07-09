import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '../../generated/prisma/index';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(name: string, email: string, password: string, role: string) {
    const user = await this.prisma.user.create({
      data: { name, email, password, role: role as Role },
    });
    return {
      message: 'Cadastro realizado com sucesso',
      user,
    };
  }

  async login(email: string, password: string, role: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND);
    }
    if (user.password !== password) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }
    if (user.role !== role) {
      throw new HttpException('Permissão negada', HttpStatus.FORBIDDEN);
    }
    return { message: 'Login realizado com sucesso', user };
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
