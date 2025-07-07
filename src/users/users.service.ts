import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({
      data: { name, email, password },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    if (user.password !== password) {
      throw new Error('Senha incorreta');
    }
    return { message: 'Login realizado com sucesso', user };
  }
}
