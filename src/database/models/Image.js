const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
});

module.exports = Image = mongoose.model("image", ImageSchema);