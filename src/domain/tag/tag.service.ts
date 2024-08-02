import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getAllTags(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }
}
