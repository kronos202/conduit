import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post(':followerId/:followingId')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async getFollowers(@Request() req) {
    return this.followerService.getFollowers(req.user.id);
  }

  @Get('following/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getFollowing(@Request() req) {
    return this.followerService.getFollowing(req.user.id);
  }
}
