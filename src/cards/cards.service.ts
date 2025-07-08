import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async createCard(data: { front: string; back: string; deckId: number; imageUrl?: string }) {
    return this.prisma.card.create({
      data: {
        front: data.front,
        back: data.back,
        imageUrl: data.imageUrl,
        deck: { connect: { id: data.deckId } },
      },
    });
  }

  async findAll() {
    return this.prisma.card.findMany({ include: { deck: true } });
  }

  async findById(id: number) {
    return this.prisma.card.findUnique({ where: { id }, include: { deck: true } });
  }

  async updateCard(id: number, data: { front?: string; back?: string; imageUrl?: string }) {
    return this.prisma.card.update({ where: { id }, data });
  }

  async deleteCard(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }
}
