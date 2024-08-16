import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { BaseService } from 'src/core/service/base.service';
import { UpdateFollowerDto } from './dto/update-follower.dto';

@Injectable()
export class FollowerService extends BaseService<
  CreateFollowerDto,
  UpdateFollowerDto,
  Prisma.FollowerWhereInput,
  Prisma.FollowerSelect,
  Prisma.FollowerInclude
> {
  constructor(protected databaseService: PrismaService) {
    super(databaseService, 'Follower');
  }

  async followUser(data: CreateFollowerDto) {
    const { followerId, followingId } = data;

    const existingFollower = await this.databaseService.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollower) {
      throw new BadRequestException('You are already following this user.');
    }

    return await this.create(
      { followerId, followingId },
      { follower: true, following: true },
    );
  }

  async unfollowUser(data: CreateFollowerDto) {
    const { followerId, followingId } = data;

    await this.databaseService.follower.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  }

  async getFollowers(userId: number) {
    return this.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
  }

  async getFollowing(userId: number) {
    return this.databaseService.follower.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: true,
      },
    });
  }
}
