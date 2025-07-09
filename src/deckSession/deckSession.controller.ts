import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { DeckSessionService } from './deckSession.service';

@Controller('deck-sessions')
export class DeckSessionController {
  constructor(private deckSessionService: DeckSessionService) {}

  // GET /decks/:deckId/cards - retorna todas as cartas do deck
  @Get('/decks/:deckId/cards')
  getCardsFromDeck(@Param('deckId') deckId: string) {
    return this.deckSessionService.getCardsFromDeck(Number(deckId));
  }

  // POST /deck-sessions - cria sessão e reviews em lote
  @Post()
  async createSessionWithReviews(@Body() body: { studentId: string; deckId: number; reviews: { cardId: number; result: 'CORRECT' | 'INCORRECT' }[] }) {
    return this.deckSessionService.createSessionWithReviews(body);
  }
}
