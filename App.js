"use strict";

const path = require("path");

// Express
const express = require("express");
const app = express();

// Middleware
const { configMulter } = require("./src/middleware/ImageUploadMiddleware");
const upload = configMulter("image");

// App Controller
const {
  GetImage,
  PostImage,
  RootHandler,
  PageNotFoundHandler,
} = require("./src/AppController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * All images are ACCESSIBLE to public.
 * From the perspective of security this is not ideal/safe
 * e.g., Pictures that are private, confidential, etc...
 *
 * This is for the purpose of demo only
 */
app.use(express.static(path.join(__dirname, "/public")));

// app.listen(port, SetUp);

// Home page
app.get("/", RootHandler);

// GET Image(s)
app.get("/search", GetImage);

// POST Image
app.post("/add", upload, PostImage);

// Wildcard handler
app.get("*", PageNotFoundHandler);

module.exports = app;
