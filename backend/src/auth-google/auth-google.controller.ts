import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { LoginResponseDto } from 'src/domain/auth/dto/login-response.dto';
import { AuthService } from 'src/domain/auth/auth.service';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('auth-google')
export class AuthGoogleController {
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthGoogleLoginDto): Promise<LoginResponseDto> {
    const socialData = await this.authGoogleService.getProfileByToken(loginDto);

    return this.authService.validateSocialLogin('google', socialData);
  }
}
