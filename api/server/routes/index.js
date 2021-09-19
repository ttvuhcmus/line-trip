const express = require("express");

const customer = require("./customer");
const admin = require("./admin");
const api = require("./api");
const siteApp = new express.Router();

siteApp.use("/customer", customer);
siteApp.use("/admin", admin);
siteApp.use("/public", api);

module.exports = siteApp;
