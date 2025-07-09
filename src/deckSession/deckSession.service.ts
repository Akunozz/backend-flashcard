import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewResult } from '../../generated/prisma'; // ajuste o caminho se necessário

@Injectable()
export class DeckSessionService {
  constructor(private prisma: PrismaService) {}

  // Retorna todas as cartas de um deck
  async getCardsFromDeck(deckId: number) {
    return this.prisma.card.findMany({ where: { deckId } });
  }

  // Cria uma sessão e os reviews em lote
  async createSessionWithReviews(data: { studentId: string; deckId: number; reviews: { cardId: number; result: 'CORRECT' | 'INCORRECT' }[] }) {
    // Cria a sessão
    const session = await this.prisma.deckSession.create({
      data: {
        studentId: data.studentId,
        deckId: data.deckId,
      },
    });
    // Cria os reviews em lote
    const reviews = await this.prisma.review.createMany({
      data: data.reviews.map(r => ({
        sessionId: session.id,
        cardId: r.cardId,
        result: r.result as ReviewResult,
      })),
    });
    return { session, reviews };
  }
}
