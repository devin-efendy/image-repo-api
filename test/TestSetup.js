require("dotenv").config({ path: `.env.test` });

const mongoose = require("mongoose");
const fs = require("fs");

const imageUploadPath = `${__dirname}/uploads/`;

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};

const dropAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
      // Safe to ignore.
      if (error.message === "ns not found") return;

      // This error happens when you use it.todo.
      // Safe to ignore.
      if (error.message.includes("a background operation is currently running"))
        return;

      console.log(error.message);
    }
  }
};

module.exports = {
  setupTest(databaseName) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `mongodb://127.0.0.1:${process.env.DB_PORT}/${databaseName}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
      fs.rmdirSync(imageUploadPath, { recursive: true });
    });
  },
};
