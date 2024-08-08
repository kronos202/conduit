import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from 'src/core/interceptors/serialize.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/core/decorator/public.decorator';

@Controller('users')
@UseInterceptors(SerializeInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  findAll() {
    return this.userService.findAll();
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
