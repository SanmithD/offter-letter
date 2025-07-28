import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isResume = file.fieldname === 'resume';
    
    return {
      folder: isResume ? 'resumes' : 'uploads',
      resource_type: isResume ? 'raw' : 'image',
      public_id: `${Date.now()}_${file.originalname}`,
      allowed_formats: isResume 
        ? ['pdf', 'doc', 'docx'] 
        : ['jpg', 'jpeg', 'png', 'webp'],
      use_filename: true,
      unique_filename: false
    };
  },
});


const upload = multer({ storage });

export default upload;
