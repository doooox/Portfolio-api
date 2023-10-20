import multer from 'multer';
import path from 'path';
import { Request } from 'express';

export const filePath = path.join(
  process.cwd(),
  'apps',
  'porfolio-be',
  'src',
  'assets',
  'images'
);

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
