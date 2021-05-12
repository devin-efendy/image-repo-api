const Image = require("../database/models/Image");
const RepoResponseCodes = require("./RepoResponseCodes");

const addImage = async ({ imageKey, imageUrl, description, uploadDate }) => {
  const newImage = new Image({
    imageKey,
    imageUrl,
    description,
    uploadDate,
  });

  try {
    const saveResult = await newImage.save();

    return {
      code: RepoResponseCodes.SUCCESS,
      message: "",
      content: {
        imageKey: saveResult.imageKey,
        imageUrl: saveResult.imageUrl,
        description: saveResult.description ? saveResult.description : "",
        uploadDate: saveResult.uploadDate,
      },
    };
  } catch (exception) {
    return {
      code: RepoResponseCodes.FAILED,
      error: exception,
    };
  }
};

module.exports = { addImage };
