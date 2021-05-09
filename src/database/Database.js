// Database setup
const mongoose = require("mongoose");
const connectionURL = `mongodb://mongo:${process.env.DB_PORT}/image-repo`;

const connectDB = () => {
  mongoose
    .connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected."))
    .catch((error) => console.log(error));
};

module.exports = { connectDB };
