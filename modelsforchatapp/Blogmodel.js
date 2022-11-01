const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const blogSchema = mongoose.Schema(
  {
    image: { type: "String", required: true },
    content: { type: "String", required: true },
  },
  { timestaps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
