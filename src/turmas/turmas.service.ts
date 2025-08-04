import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

async function generateUniqueToken(
  prisma: PrismaService,
  length = 6,
): Promise<string> {
  const chars = '0123456789';
  let token: string;
  let exists = true;
  do {
    token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const turma = await prisma.turma.findUnique({ where: { token } });
    exists = !!turma;
  } while (exists);
  return token;
}

@Injectable()
export class TurmasService {
  constructor(private prisma: PrismaService) {}
  async createTurma(data: {
    title: string;
    description?: string;
    professorId: string;
  }) {
    const token = await generateUniqueToken(this.prisma);
    const turma = await this.prisma.turma.create({
      data: { ...data, token },
    });
    return {
      message: 'Turma criada com sucesso',
      token: turma.token,
      turma
    };
  }

  async findAll() {
    return this.prisma.turma.findMany({
      include: { professor: true, turmaAluno: true },
    });
  }

  async findByProfessor(professorId: string) {
    return this.prisma.turma.findMany({
      where: { professorId },
      include: { professor: true, turmaAluno: true },
    });
  }

  async findById(id: number) {
    return this.prisma.turma.findUnique({
      where: { id },
      include: { professor: true, turmaAluno: true },
    });
  }

  async addAluno(turmaId: number, studentId: string) {
    return this.prisma.turmaAluno.create({ data: { turmaId, studentId } });
  }

  async deleteTurma(id: number) {
    return this.prisma.turma.delete({ where: { id } });
  }
}
