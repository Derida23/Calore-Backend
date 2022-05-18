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
      message: 'success upload image cloudinary',
      data: result.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(file);
    return {
      status: 400,
      message: 'failed upload image cloudinary',
      data: null,
    };
  }
};

exports.delete = async (file) => {
  // const public_id = "Calore/" + file
  const image_name = file.split('/');
  const public_id = 'Calore/' + image_name[8].split('.')[0];

  try {
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      return {
        status: 202,
        message: 'success delete image cloudinary',
        data: null,
      };
    } else {
      return {
        status: 404,
        message: 'image cloudinary not found',
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 400,
      message: 'failed delete image cloudinary',
      data: null,
    };
  }
};
