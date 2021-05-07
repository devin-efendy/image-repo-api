const path = require("path");
const multer = require("multer");

const FILE_SIZE_LIMIT = 1000000;

const storage = multer.diskStorage({
  /**
   * All images are stored in a project folder. This is not ideal.
   * The ideal solution would be using a proper Object Storage service
   * such as MinIO or AWS S3
   *
   * This is for the purpose of demo only
   */
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    if (file == null) {
      return callback(new Error("Missing file"));
    }

    const parsedFile = path.parse(file.originalname);
    const uploadDate = Date.now();

    /**
     * TODO: Implementing a more robust file naming
     * e.g., what to do with file name that contains space?
     */
    const imageName = req.body.name.replace(/ /g, "_");
    const fileName = `${imageName}_${uploadDate}${parsedFile.ext}`;

    req.body.uploadDate = uploadDate;
    req.body.fileName = fileName;

    return callback(null, fileName);
  },
});

// Init Upload
const multerOptions = multer({
  storage: storage,
  limits: { fileSize: FILE_SIZE_LIMIT },
  fileFilter: (req, file, cb) => {
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

const configMulter = (paramName) => {
  return multerOptions.single(paramName);
};

module.exports = { configMulter };
