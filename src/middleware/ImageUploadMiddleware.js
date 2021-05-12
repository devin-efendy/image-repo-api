const path = require("path");
const multer = require("multer");

const FILE_SIZE_LIMIT = 1000000;

// Init Upload
const configMulter = (paramName) => {
  // We want to store the image into a buffer before uploading it to S3
  const multerMemoryStorage = multer.memoryStorage();

  const multerOptions = multer({
    storage: multerMemoryStorage,
    limits: { fileSize: FILE_SIZE_LIMIT },
    fileFilter: (req, file, cb) => {
      // Credit @Traversy Media
      // Allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      // Check ext
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      // Check mime
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        req.fileValidationError = "Incompatible file type";
        return cb(null, false);
      }
    },
  });

  return multerOptions.single(paramName);
};

module.exports = { configMulter };
