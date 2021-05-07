"use strict";

const Image = require("../database/models/Image");
const RepoResponseCodes = require("./RepoResponseCodes");

const addImage = async ({ name, imageUrl, uploadDate }) => {
  const newImage = new Image({
    name,
    imageUrl,
    uploadDate,
  });

  try {
    await newImage.save();

    return {
      code: RepoResponseCodes.SUCCESS,
      message: "",
      content: {
        name,
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
