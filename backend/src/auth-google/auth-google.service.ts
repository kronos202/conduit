import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import AllConfigType from 'src/config';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from 'src/auth-google/interfaces/social.interface';
import { getConfig } from 'src/utils/helpers/getConfig';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;
  private config = getConfig(this.configService);

  constructor(private configService: ConfigService<AllConfigType>) {
    this.google = new OAuth2Client(
      this.config.google.clientId,
      this.config.google.clientSecret,
    );
  }

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [this.config.google.clientId],
    });

    const data = ticket.getPayload();

    if (!data) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'wrongToken',
        },
      });
    }

    return {
      id: data.sub,
      email: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
    };
  }
}
