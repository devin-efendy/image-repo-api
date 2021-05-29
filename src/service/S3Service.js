//AWS
var AWS = require("aws-sdk");
const path = require("path");

const uploadImageToS3 = async (imageFile) => {
  console.log('S3Service: uploadImageToS3');
  const parsedFile = path.parse(imageFile.originalname);

  /**
   * TODO: Implementing a more robust file naming
   * e.g., what to do with file name that contains space?
   */
  const fileBaseName = parsedFile.name.replace(/ /g, "_");
  const uploadDate = Date.now();

  const imageName = `${fileBaseName}_${uploadDate}${parsedFile.ext}`;

  const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: imageFile.buffer,
    ContentType: imageFile.mimetype,
    ACL: "public-read",
  };

  try {
    let uploadResult = await s3bucket.upload(params).promise();
    uploadResult.uploadDate = uploadDate;

    return uploadResult;
  } catch (error) {
    return error;
  }
};

module.exports = { uploadImageToS3 };
