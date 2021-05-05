"use strict";

require("dotenv").config();

const express = require("express");
const app = express();

const multer = require('multer');
const upload = multer();

// Database setup
const mongoose = require("mongoose");

const connectionURL = `mongodb://mongo:${process.env.DB_PORT}/image-repo`;

const port = process.env.PORT;

const Image = require("./models/Image");
const ImageRepository = require("./repository/ImageRepository");
const RepositoryCode = require("./repository/RepoEnums");

// for parsing application/json
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Connect to MongoDB
app.listen(port, () => {
  console.log(`Server is up on port http://localhost:${port}`);

  mongoose
    .connect(connectionURL, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected."))
    .catch((error) => console.log(errpr));
});

app.get("/", (req, res) => {
  res.status(200).send("Image Repository API - Devin Efendy");
  //   res.send("Hello express!!!!");
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
app.post("/add", (req, res) => {
  const body = req.body;
  const name = body.name;
  const image = body.image;

  console.log(body);

  const { code, message } = ImageRepository.addImage(req.body);

  if (code === RepositoryCode.SUCCESS) {
    res.status(200).send("OK");
  } else {
    res.status(500).send(message);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});
