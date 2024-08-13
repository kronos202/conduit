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
import { Public } from 'src/core/decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SerializeInterceptor } from 'src/core/interceptors/serialize.interceptor';
import { LocalAuthGuard } from 'src/core/guard/local.guard';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';

@Controller('auth')
@UseInterceptors(SerializeInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() data: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return await this.authService.signIn(data);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.authService.register(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'Đăng kí thành công hãy kiểm tra email',
    });
  }

  @Post('email/confirm')
  @Public()
  async confirmEmail(@Body() authConfirmEmailDto: AuthConfirmEmailDto) {
    return await this.authService.confirmEmail(authConfirmEmailDto.hash);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @Get('me')
  public me(@Request() request): Promise<NullableType<User>> {
    return this.authService.me(request.user);
  }

  @Post('logout')
  public async logout(@Request() request, @Res() res: Response) {
    console.log(request.user.sessionId);

    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
    return res.status(HttpStatus.OK).json([]);
  }
}
