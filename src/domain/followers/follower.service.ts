import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FollowerService {
  constructor(private databaseService: PrismaService) {}
  async followUser(data: Prisma.FollowerUncheckedCreateInput) {
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
    return await this.databaseService.follower.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(data: Prisma.FollowerUncheckedCreateInput) {
    const { followerId, followingId } = data;

    return await this.databaseService.follower.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async getFollowers(userId: number) {
    return this.databaseService.follower.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: true,
      },
    });
  }

  async getFollowing(userId: number) {
    return this.databaseService.follower.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: true,
      },
    });
  }
}
