import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewResult } from 'generated/prisma';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.review.findMany({
      include: { session: true, card: true },
    });
  }

  async findById(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { session: true, card: true },
    });
  }
}
