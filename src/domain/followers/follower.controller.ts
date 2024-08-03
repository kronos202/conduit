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
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post(':followerId/:followingId')
  async followUser(
    @Param('followerId', ParseIntPipe) followingId: number,
    @Request() req,
  ) {
    return this.followerService.followUser({
      followerId: req.user.id,
      followingId,
    });
  }

  @Delete(':followerId/:followingId')
  async unfollowUser(
    @Param('followingId', ParseIntPipe) followingId: number,
    @Request() req,
  ) {
    return this.followerService.unfollowUser({
      followerId: req.user.id,
      followingId,
    });
  }

  @Get('followers/:userId')
  async getFollowers(@Request() req) {
    return this.followerService.getFollowers(req.user.id);
  }

  @Get('following/:userId')
  async getFollowing(@Request() req) {
    return this.followerService.getFollowing(req.user.id);
  }
}
