import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from 'src/core/interceptors/serialize.interceptor';

@Controller('users')
@UseInterceptors(SerializeInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  findAll() {
    return this.userService.findAll();
  }
  @Patch('softDelete')
  softDeleteUser(@Req() req) {
    return this.userService.softDeleteUser(req.user.id);
  }
  @Patch('restore')
  restoreUsser(@Req() req) {
    return this.userService.restoreUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
