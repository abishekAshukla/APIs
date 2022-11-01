const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const blogSchema = mongoose.Schema(
  {
      title: { type: "String", required: true },
      category: { type: "String", required: true },
      date: { type: "String", required: true },
      author: { type: "String", required: true },
      duration: { type: "String", required: true },
      shares: { type: "String", required: true },
      postid: { type: "String", required: true },
      thumbnail: { type: "String", required: true },
    intro: { type: "String", required: true },
    tableofcontent: { type: "String", required: true },
    maincontent: { type: "String", required: true },
    authorbio: { type: "String", required: true },
    authorimg: { type: "String", required: true },
    relatedposts: [
      {
        type: String,
      },
    ],
    socials: [
      {
        type: String,
      },
    ],
  },
  { timestaps: true }
);

const BlogPost = mongoose.model("BlogPost", blogSchema);

module.exports = BlogPost;
