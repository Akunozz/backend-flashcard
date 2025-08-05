
import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
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

  @Get('professor/:professorId')
  findByProfessor(@Param('professorId') professorId: string) {
    return this.turmasService.findByProfessor(professorId);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.turmasService.findByStudent(studentId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.turmasService.findById(Number(id));
  }

  @Post('aluno')
  addAluno(@Body() body: { studentId: string; token: string }) {
    return this.turmasService.addAluno(body.studentId, body.token);
  }

  @Delete(':id')
  deleteTurma(@Param('id') id: string) {
    return this.turmasService.deleteTurma(Number(id));
  }
}
