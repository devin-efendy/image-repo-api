const Image = require("../database/models/Image");
const RepoResponseCodes = require("./RepoResponseCodes");

const addImage = async ({ imageUrl, uploadDate }) => {
  const newImage = new Image({
    imageUrl,
    uploadDate,
  });

  try {
    await newImage.save();

    return {
      code: RepoResponseCodes.SUCCESS,
      message: "",
      content: {
        id: newImage.id,
        imageUrl,
        uploadDate,
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
