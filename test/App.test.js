require("dotenv").config({ path: `.env.test` });

const app = require("../App"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

const path = require("path");
const fs = require("fs");

// Database
const Image = require("../src/database/models/Image");
const ImageData = require("./src/database/Image.seed");
const { setupTest } = require("./TestSetup");

// AWS S3 Service Mock
jest.mock("../src/service/S3Service", () => {
  const TestData = require("./src/database/Image.seed")[0];

  return {
    uploadImageToS3: jest.fn().mockReturnValue({
      Key: TestData.imageKey,
      Location: TestData.imageUrl,
      uploadDate: TestData.uploadDate,
    }),
  };
});

setupTest("image-repo-test-db");

it("GET/search should return empty response, with empty database", async () => {
  const response = await request.get("/search");
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(0);
});

it("GET/search should return all images, with seeded database", async () => {
  await Image.insertMany(ImageData); // seed the database

  const response = await request.get("/search");
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(ImageData.length);
});

it("POST/add with valid file return 200 OK", async (done) => {
  const filePath = `${__dirname}/test-images/car.jpg`;

  request
    .post("/add")
    .attach("image", filePath)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.imageKey).toBe(ImageData[0].imageKey);
      expect(res.body.imageUrl).toBe(ImageData[0].imageUrl);
      expect(res.body.description).toBe(ImageData[0].description);
      expect(res.body.uploadDate).toBe(
        new Date(ImageData[0].uploadDate).toISOString()
      );
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});

it("POST/add without image file return 400 Bad Request", async () => {
  request
    .post("/add")
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("'image' should be included in the request");
    })
    .catch((err) => {
      console.log(err);
    });
});

it("POST/add with an invalid file type return 400 Bad Request", async () => {
  const filePath = `${__dirname}/test-images/invalid.txt`;

  request
    .post("/add")
    .attach("image", filePath)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Incompatible file type");
    })
    .catch((err) => {
      console.log(err);
    });
});
