"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;

conn.on("error", err => {
  console.log("MongoDB Error at Connection Process...", err);
  process.exit(1);
});

conn.once("open", () => {
  console.log("MongoDB Already Connected...", mongoose.connection.name);
});

const environment = process.env.NODE_ENV;

if (environment === "dev") {
  mongoose.connect("mongodb://localhost/nodepop");
} else {
  mongoose.connect("mongodb://admin:papapa22@ds125368.mlab.com:25368/nodemon");
}
