import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { FollowerService } from './follower.service';

@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('/:followingId')
  async followUser(
    @Param('followingId', ParseIntPipe) followingId: number,
    @Request() req,
  ) {
    return this.followerService.followUser({
      followerId: followingId,
      followingId: req.user.id,
    });
  }

  @Delete(':followingId')
  async unfollowUser(
    @Param('followingId', ParseIntPipe) followingId: number,
    @Request() req,
  ) {
    return await this.followerService.unfollowUser({
      followerId: followingId,
      followingId: req.user.id,
    });
  }

  @Get('follower/:id')
  async getFollowers(@Param('id', ParseIntPipe) id: number) {
    return this.followerService.getFollowers(id);
  }

  @Get('following/:id')
  async getFollowing(@Param('id', ParseIntPipe) id: number) {
    return this.followerService.getFollowing(id);
  }
}
