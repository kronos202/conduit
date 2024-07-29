import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/utils/types/cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result !== 'ok') {
        throw new Error(`Failed to delete image with public ID: ${publicId}`);
      }
    } catch (error) {
      throw error;
    }
  }
  //   uploadFile(filePath: string): Promise<CloudinaryResponse> {
  //     return new Promise<CloudinaryResponse>((resolve, reject) => {
  //       cloudinary.uploader.upload(
  //         filePath,
  //         { folder: 'nestfolder' },
  //         (error, result) => {
  //           if (error) return reject(error);
  //           resolve(result);
  //         },
  //       );
  //     });
  //   }
}
