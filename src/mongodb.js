// mongodb database creation

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nodelogin")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("faild to connect mongodb");
  });

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("mycollection", loginSchema);

module.exports = collection;
