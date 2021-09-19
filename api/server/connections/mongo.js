const mongoose = require("mongoose");
const { MONGODB } = require("../utils/domain");

const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// const connection = MONGODB;
const connection =
  "mongodb://lamlam:lamlam123@35.187.240.39:27017/linetrip?authSource=admin";
mongoose
  .connect(connection, opts)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
