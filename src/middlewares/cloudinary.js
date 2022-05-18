import { v2 as cloudinary } from 'cloudinary';
import { cloudName, apiKey, cloudinaryApiSecret } from '../config/env';
import fs from 'fs';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: cloudinaryApiSecret,
  secure: true,
});

exports.uploads = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, { folder: 'Calore' });
    fs.unlinkSync(file);

    return {
      status: 202,
      message: 'success upload cloudinary',
      data: result.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(file);
    return {
      status: 400,
      message: 'failed upload cloudinary',
      data: null,
    };
  }
};
