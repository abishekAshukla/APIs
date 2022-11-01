const express = require("express");

const {
  getblog,
  createBlog,
} = require("../controllersforblog/blogpostcontrollers");

const router = express.Router();

router.route("/blog/:blogId").get(getblog);
router.post("/createblog", createBlog);

module.exports = router;
