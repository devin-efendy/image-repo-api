const path = require("path");
const multer = require("multer");

const FILE_SIZE_LIMIT = 1000000;

const storage = multer.diskStorage({
  /**
   * All images are stored in a project folder. This is not ideal
   * The ideal solution would be using a proper Object Storage service
   * such as MinIO or AWS S3
   *
   * This is for the purpose of demo only
   */
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const parsedFile = path.parse(file.originalname);
    const uploadDate = Date.now();

    /**
     * TODO: Implementing a more robust file naming. 
     * e.g., what to do with file name that contains space?
     */
    const imageName = req.body.name.replace(/ /g,"_");
    const fileName = `${imageName}_${uploadDate}${parsedFile.ext}`;

    req.body.uploadDate = uploadDate;
    req.body.fileName = fileName;

    
    return cb(null, fileName);
  },
});

// Init Upload
const multerConfig = multer({
  storage: storage,
  limits: { fileSize: FILE_SIZE_LIMIT },
});

const upload = (paramName) => {
  return multerConfig.single(paramName);
};

module.exports = { upload };
