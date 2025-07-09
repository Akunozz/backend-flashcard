import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DeckSessionService } from './deckSession.service';
import { DeckSessionController } from './deckSession.controller';

@Module({
  imports: [PrismaModule],
  providers: [DeckSessionService],
  controllers: [DeckSessionController],
  exports: [DeckSessionService],
})
export class DeckSessionModule {}
