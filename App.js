"use strict";

require("dotenv").config();
const path = require("path");

const appUrl = process.env.APP_URL;
const port = process.env.PORT || 3000;

// Express
const express = require("express");
const app = express();

// Database
const Database = require("./src/database/Database");
const Image = require("./src/database/models/Image");
// Image Repository
const ImageRepository = require("./src/repository/ImageRepository");
const RepositoryCodes = require("./src/repository/RepositoryCodes");
// Middleware
const ImageUploadMiddleware = require("./src/middleware/ImageUploadMiddleware");
// HTTP Code Enum
const HttpCodes = require("./src/HttpCodes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * All images are ACCESSIBLE to public. In terms of security this is not ideal/safe
 * e.g., Pictures that are private, confidential, etc...
 *
 * This is for the purpose of demo only
 */
app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, () => {
  console.log(`Server is up on port http://localhost:${port}`);
  Database.connectDB(); // connect to MongoDB
});

app.get("/", (req, res) => {
  res.status(HttpCodes.OK).send("Image Repository API @devin-efendy");
});

// GET Images
app.get("/search", (req, res) => {
  Image.find().then((images) => {
    console.log(images);
    response = images;
    res.json(response);
  });
});

// POST Image(s)
app.post("/add", ImageUploadMiddleware.upload("image"), async (req, res) => {
  const imageName = req.body.name;
  const fileName = req.body.fileName;
  const uploadDate = req.body.uploadDate;

  const imageDto = {
    name: imageName,
    imageUrl: `${appUrl}:${port}/uploads/${fileName}`,
    uploadDate,
  };

  try {
    const addImageResult = await ImageRepository.addImage(imageDto);

    if (addImageResult.code === RepositoryCodes.SUCCESS) {
      res.status(200).json(addImageResult.content);
    } else {
      res.status(500).json(response);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});

app.get("*", (req, res) => {
  res.status(HttpCodes.BAD_REQUEST).send("Page Not found");
});
