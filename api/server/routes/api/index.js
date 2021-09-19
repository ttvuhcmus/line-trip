const express = require("express");
const locations = require("./locations");

const siteApp = new express.Router();

siteApp.use("/location", locations);

module.exports = siteApp;
