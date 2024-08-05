import { v2 as cloudinary } from 'cloudinary';

export const UploadProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dij9ys2ya',
      api_key: '528377474789366',
      api_secret: 'jLCpEf0BHE3IcxHGboSL8p35wqc',
    });
  },
};
