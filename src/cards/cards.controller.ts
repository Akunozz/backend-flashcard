import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  create(@Body() body: { front: string; back: string; deckId: number; imageUrl?: string }) {
    return this.cardsService.createCard(body);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get('deck/:deckId')
  findByDeckId(@Param('deckId') deckId: string) {
    return this.cardsService.findByDeckId(Number(deckId));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.cardsService.findById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { front?: string; back?: string; imageUrl?: string }) {
    return this.cardsService.updateCard(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardsService.deleteCard(Number(id));
  }
}
