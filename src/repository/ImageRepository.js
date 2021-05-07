"use strict";

const Image = require("../database/models/Image");
const RepositoryCodes = require("./RepositoryCodes");

const addImage = async ({ name, imageUrl, uploadDate }) => {
  const newImage = new Image({
    name,
    imageUrl,
    uploadDate,
  });

  try {
    await newImage.save();

    return {
      code: RepositoryCodes.SUCCESS,
      message: "",
      content: {
        name,
        imageUrl,
        uploadDate,
      },
    };
  } catch (exception) {
    return {
      code: RepositoryCodes.FAILED,
      message: error,
    };
  }
};

module.exports = { addImage };
