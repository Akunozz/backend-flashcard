
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TurmasService } from './turmas.service';

@Controller('turmas')
export class TurmasController {
  constructor(private turmasService: TurmasService) {}

  @Post()
  create(@Body() body: { title: string; description?: string; token: string; professorId: string }) {
    return this.turmasService.createTurma(body);
  }

  @Get()
  findAll() {
    return this.turmasService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.turmasService.findById(Number(id));
  }

  @Post(':id/alunos')
  addAluno(@Param('id') id: string, @Body() body: { studentId: string }) {
    return this.turmasService.addAluno(Number(id), body.studentId);
  }
}
