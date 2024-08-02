import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthService } from './auth.service';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { NullableType } from 'src/utils/types/nullable';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from 'src/core/guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() data: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.authService.signIn(data);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    console.log(request.user);

    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.user)
  public me(@Request() request): Promise<NullableType<User>> {
    console.log(request.user);

    return this.authService.me(request.user);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  public async logout(@Request() request, @Res() res: Response) {
    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
    return res.status(HttpStatus.OK).json([]);
  }
}
