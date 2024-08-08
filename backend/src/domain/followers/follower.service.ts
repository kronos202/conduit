import { BadRequestException, Injectable } from '@nestjs/common';
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
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async unfollowUser(data: Prisma.FollowerUncheckedCreateInput) {
    const { followerId, followingId } = data;

    await this.databaseService.follower.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  }

  async getFollowers(userId: number) {
    return this.databaseService.follower.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: true,
      },
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
