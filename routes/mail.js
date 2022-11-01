const express = require("express");

const { sendmailTo } = require("../controllersforsendemail/mailcontroller");

const router = express.Router();

router.route("/verify/:blogId").get(sendmailTo);

module.exports = router;
