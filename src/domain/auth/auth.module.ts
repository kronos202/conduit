import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { UserService } from '../users/user.service';
import { RoleModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';
import { SessionModule } from '../sessions/session.module';
import { SessionService } from '../sessions/session.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    RoleModule,
    SessionModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    UserService,
    RolesService,
    SessionService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
