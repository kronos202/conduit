import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload/upload.service';
import { Response } from 'express';

@Controller('images')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly upload: UploadService,
  ) {}

  @Delete(':publicId')
  async deleteImage(
    @Param('publicId') publicId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.upload.deleteImage(publicId);
      res.status(200).json({ message: 'Image deleted successfully!' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to delete image', error: error.message });
    }
  }

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.upload.uploadFile(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadResults = [];
    for (const file of files) {
      const result = await this.upload.uploadFile(file);
      uploadResults.push(result);
    }
    return uploadResults;
  }
}