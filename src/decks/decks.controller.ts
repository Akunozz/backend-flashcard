import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Post()
  create(@Body() body: { title: string; description?: string; turmaId: number }) {
    return this.decksService.createDeck(body);
  }

  @Get()
  findAll() {
    return this.decksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.decksService.findById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; description?: string }) {
    return this.decksService.updateDeck(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.decksService.deleteDeck(Number(id));
  }
}
