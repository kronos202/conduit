import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'nestjs-prisma';
import { Session, User } from '@prisma/client';
import { NullableType } from 'src/utils/types/nullable';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    return this.prisma.session.create({
      data: createSessionDto,
    });
  }

  async findOne(id: Session['id']): Promise<NullableType<Session>> {
    return await this.prisma.session.findUnique({
      where: { id },
      include: {
        user: {
          include: { role: true },
        },
      },
    });
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    return this.prisma.session.update({
      where: { id },
      data: updateSessionDto,
    });
  }

  async deleteById(id: number) {
    return this.prisma.session.delete({
      where: { id },
    });
  }

  async deleteUserId(userId: User['id']) {
    return this.prisma.session.deleteMany({
      where: { userId },
    });
  }
  async deleteByUserIdWithExclude(
    userId: User['id'],
    excludeSessionId: Session['id'],
  ) {
    return this.prisma.session.deleteMany({
      where: {
        userId,
        id: {
          not: excludeSessionId,
        },
      },
    });
  }
}
