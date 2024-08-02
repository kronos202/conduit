import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleEnum } from './roles.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body('name') name: RoleEnum) {
    return this.rolesService.createRole(name);
  }

  @Post(':userId/assign')
  assignRoleToUser(
    @Param('userId') userId: number,
    @Body('role') roleName: RoleEnum,
  ) {
    return this.rolesService.assignRoleToUser(userId, roleName);
  }

  @Get('userRoles/:userId')
  getUserRole(@Param('userId', ParseIntPipe) userId: number) {
    return this.rolesService.getUserRoles(userId);
  }
}
