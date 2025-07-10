import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  
  async findAll() {
    return this.prisma.review.findMany({
      include: { session: true, card: true },
    });
  }

  async findById(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { session: true, card: true },
    });
  }
  
  async getReviewStatsByTurmaId(turmaId: number) {
    // Busca todos os cards da turma
    const cards = await this.prisma.card.findMany({
      where: { deck: { turmaId } },
      select: { id: true },
    });
    const cardIds = cards.map(c => c.id);
    // Busca todos os reviews desses cards
    const reviews = await this.prisma.review.findMany({
      where: { cardId: { in: cardIds } },
      select: { cardId: true, result: true },
    });
    // Agrupa por cardId e conta CORRECT/INCORRECT
    const stats: Record<number, { correct: number; incorrect: number }> = {};
    for (const card of cardIds) {
      stats[card] = { correct: 0, incorrect: 0 };
    }
    for (const review of reviews) {
      if (review.result === 'CORRECT') stats[review.cardId].correct++;
      if (review.result === 'INCORRECT') stats[review.cardId].incorrect++;
    }
    // Retorna array de objetos { cardId, correct, incorrect }
    return Object.entries(stats).map(([cardId, { correct, incorrect }]) => ({
      cardId: Number(cardId),
      correct,
      incorrect,
    }));
  }
}
