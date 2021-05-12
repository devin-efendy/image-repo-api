"use strict";

const appUrl = process.env.APP_URL;
const port = process.env.PORT || 3000;

// Database
const Database = require("./database/Database");
const Image = require("./database/models/Image");
// Image Repository
const ImageRepository = require("./repository/ImageRepository");
const RepoResponseCodes = require("./repository/RepoResponseCodes");
// HTTP Code Enum
const HttpCodes = require("./HttpCodes");
// AWS S3 Service for image storage
const { uploadImageToS3 } = require("./service/S3Service");

const SetUp = () => {
  console.log(`Server is up on port ${appUrl}:${port}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  Database.connectDB(); // connect to MongoDB
};

const GetImage = async (req, res) => {
  try {
    const findResult = await Image.find();

    const getResponse = findResult.map((result) => ({
      id: result._id,
      imageName: result.name,
      imageUrl: result.imageUrl,
      uploadDate: result.uploadDate,
    }));

    return res.status(HttpCodes.OK).json(getResponse);
  } catch (e) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ error: e });
  }
};

const PostImage = async (req, res) => {
  const imageFile = req.file;

  if (req.fileValidationError) {
    return res
      .status(HttpCodes.BAD_REQUEST)
      .json({ error: req.fileValidationError });
  }

  if (!imageFile) {
    return res
      .status(HttpCodes.BAD_REQUEST)
      .json({ error: "'image' should be included in the request" });
  }

  try {
    const uploadResult = await uploadImageToS3(imageFile);
    
    const imageDto = {
      imageKey: uploadResult.Key,
      imageUrl: uploadResult.Location,
      description: req.body.description,
      uploadDate: uploadResult.uploadDate,
    };

    const addImageResult = await ImageRepository.addImage(imageDto);

    if (addImageResult.code == RepoResponseCodes.SUCCESS) {
      return res.status(HttpCodes.OK).json(addImageResult.content);
    } else {
      // console.error(addImageResult.error);
      return res
        .status(HttpCodes.INTERNAL_SERVER_ERROR)
        .json({ error: addImageResult.error.message });
    }
  } catch (error) {
    // console.log(error)
    return res.status(error.statusCode).send(error);
  }
};

const RootHandler = (req, res) => {
  return res.status(HttpCodes.OK).send("Image Repository API");
};

const PageNotFoundHandler = (req, res) => {
  return res.status(HttpCodes.BAD_REQUEST).send("Page Not found");
};

module.exports = {
  SetUp,
  GetImage,
  PostImage,
  RootHandler,
  PageNotFoundHandler,
};
