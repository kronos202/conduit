import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthService } from './auth.service';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { NullableType } from 'src/utils/types/nullable';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { SerializeInterceptor } from 'src/core/interceptors/serialize.interceptor';

@Controller('auth')
@UseInterceptors(SerializeInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @Public()
  async signIn(@Body() data: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return await this.authService.signIn(data);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createWithHash(createUserDto);
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
  public me(@Request() request): Promise<NullableType<User>> {
    console.log(request.user);

    return this.authService.me(request.user);
  }

  @Post('logout')
  public async logout(@Request() request, @Res() res: Response) {
    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
    return res.status(HttpStatus.OK).json([]);
  }
}
