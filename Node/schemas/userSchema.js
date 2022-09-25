const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  picture: {
    type: String,
    required: false,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
});

module.exports = mongoose.model("users", itemModel);
