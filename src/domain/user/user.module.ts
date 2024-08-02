import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesService } from '../roles/roles.service';
import { RoleModule } from '../roles/roles.module';

@Module({
  imports: [RoleModule],
  controllers: [UserController],
  providers: [UserService, RolesService],
  exports: [UserService],
})
export class UserModule {}
