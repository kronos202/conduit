import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { Public } from 'src/core/decorators/public.decorator';
import { CacheKey } from '@nestjs/cache-manager';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('allTag')
  @Public()
  @CacheKey('ALL_TAGS')
  findAll() {
    return this.tagService.getAllTags();
  }
}
