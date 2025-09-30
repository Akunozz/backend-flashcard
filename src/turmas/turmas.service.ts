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
      turma,
    };
  }

  async findAll() {
    return this.prisma.turma.findMany({
      include: { professor: true, turmaAluno: true },
    });
  }

  async findByProfessor(professorId: string) {
    const turmas = await this.prisma.turma.findMany({
      where: { professorId },
      include: { professor: true, turmaAluno: true, decks: true },
    });
    return turmas.map((turma) => ({
      ...turma,
      alunosCount: turma.turmaAluno ? turma.turmaAluno.length : 0,
      decksCount: turma.decks ? turma.decks.length : 0,
    }));
  }

  async findById(id: number) {
    return this.prisma.turma.findUnique({
      where: { id },
      include: { professor: true, turmaAluno: true },
    });
  }

  async findByStudent(studentId: string) {
    return this.prisma.turmaAluno.findMany({
      where: { studentId },
      include: {
        turma: {
          include: {
            professor: true,
            _count: {
              select: {
                turmaAluno: true, // nome da relação entre turma e alunos
                decks: true, // nome da relação entre turma e decks
              },
            },
          },
        },
      },
    });
  }

  async addAluno(studentId: string, token: string) {
    // Busca a turma pelo token
    const turma = await this.prisma.turma.findUnique({
      where: { token },
    });

    if (!turma) {
      throw new Error('Turma não encontrada com este token');
    }

    // Verifica se o aluno já está na turma
    const existingAluno = await this.prisma.turmaAluno.findFirst({
      where: { turmaId: turma.id, studentId },
    });

    if (existingAluno) {
      throw new Error('Aluno já está inscrito nesta turma');
    }

    // Adiciona o aluno à turma
    const turmaAluno = await this.prisma.turmaAluno.create({
      data: { turmaId: turma.id, studentId },
    });

    return {
      message: 'Adicionado à turma com sucesso',
      turmaAluno,
    };
  }

  async deleteTurma(id: number) {
    return this.prisma.turma.delete({ where: { id } });
  }
}
