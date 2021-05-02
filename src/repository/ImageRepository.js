"use strict";

const Image = require("../models/Image");
const RepositoryCode = require("./RepoEnums");

const addImage = ({ name, image }) => {
  const newImage = new Image({
    name,
  });

  newImage
    .save()
    .then((image) => {
      return {
        code: RepositoryCode.SUCCESS,
        message: "",
      };
    })
    .catch((error) => {
      return {
        code: RepositoryCode.FAILED,
        message: error,
      };
    });
};

module.exports = { addImage };
