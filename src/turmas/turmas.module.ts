import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';

@Module({
  imports: [PrismaModule],
  providers: [TurmasService],
  controllers: [TurmasController],
  exports: [TurmasService],
})
export class TurmasModule {}