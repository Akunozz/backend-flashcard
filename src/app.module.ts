import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TurmasModule } from './turmas/turmas.module';
import { DecksModule } from './decks/decks.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [AuthModule, UsersModule, TurmasModule, DecksModule, CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
