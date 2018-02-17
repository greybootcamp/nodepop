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

/* 
/ If environment var NODE_ENV is present and its value is equal to dev,
/  then Mongo connection will be against a local environment,
/  Otherwise, connects to MLab
*/
const environment = process.env.NODE_ENV;

if (environment === "dev") {
  mongoose.connect("mongodb://localhost/nodepop");
} else {
  mongoose.connect(
    "mongodb://admin:papapa22@ds237858.mlab.com:37858/nodepop-prod"
  );
}
