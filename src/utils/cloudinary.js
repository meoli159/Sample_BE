import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product',
    format: 'jpeg',
    resource_type: 'image', // supports promises as well
    public_id: (req, file) => {
      const timeStamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
      const uniqueIdentifier = uuidv4();
      return `${uniqueIdentifier}_${timeStamp}`;
    },
  },
});

export const uploadImage = multer({ storage: storage });

export const deleteImage = async (file) => {
  try {
    // console.log('Uploading image to Cloudinary:', img);
    const result = await cloudinary.uploader.destroy(file);
    return result;
  } catch (error) {
    console.error(error);
  }
};
