import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesService } from '../roles/roles.service';
import { RoleModule } from '../roles/roles.module';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [RoleModule, UploadModule],
  controllers: [UserController],
  providers: [UserService, RolesService, BcryptService],
  exports: [UserService],
})
export class UserModule {}
