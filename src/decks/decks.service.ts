import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DecksService {
  constructor(private prisma: PrismaService) {}

  async createDeck(data: { title: string; description?: string; turmaId: number }) {
    return this.prisma.deck.create({ data });
  }

  async findAll() {
    return this.prisma.deck.findMany({ include: { turma: true, cards: true } });
  }

  async findById(id: number) {
    return this.prisma.deck.findUnique({ where: { id }, include: { turma: true, cards: true } });
  }

  async updateDeck(id: number, data: { title?: string; description?: string }) {
    return this.prisma.deck.update({ where: { id }, data });
  }

  async deleteDeck(id: number) {
    return this.prisma.deck.delete({ where: { id } });
  }
}
