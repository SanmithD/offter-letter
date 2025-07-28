import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary (your config here is correct)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'uploads';
    let resource_type = 'image';
    if (file.fieldname === 'resume') {
      resource_type = 'raw';
      folder = 'resumes';
    }
    return {
      folder,
      resource_type,
      allowed_formats: file.fieldname === 'resume'
        ? ['pdf', 'doc', 'docx']
        : ['jpg', 'jpeg', 'png', 'webp'],
      public_id: file.originalname.split('.')[0],
    }
  },
});
const upload = multer({ storage });

export default upload;
