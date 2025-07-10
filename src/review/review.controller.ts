import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(Number(id));
  }

  @Get('turmas/:turmaId')
  getReviewStatsByTurmaId(@Param('turmaId') turmaId: string) {
    return this.reviewService.getReviewStatsByTurmaId(Number(turmaId));
  }
}
