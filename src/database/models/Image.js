const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imageKey: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
});

module.exports = Image = mongoose.model("image", ImageSchema);
