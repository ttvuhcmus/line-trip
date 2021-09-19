const express = require("express");
// const isAuth = require("../../firewall/authUser");
const auth = require("./auth");
const newfeed = require("./newfeed");
const customer = require("./customer");
const news = require("./news");
const place = require("./place");
const city = require("./city");
const image = require("./image");
const comment = require("./comment");
const siteApp = new express.Router();

siteApp.use("/auth", auth);
siteApp.use("/newfeed", newfeed);
siteApp.use("/customer", customer);
siteApp.use("/news", news);
siteApp.use("/place", place);
siteApp.use("/city", city);
siteApp.use("/image", image);
siteApp.use("/comment", comment);
module.exports = siteApp;