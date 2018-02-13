"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;
const Anuncio = require("../models/Anuncio");

const anuncios = require("./MOCK_DATA.json");

conn.once("open", async () => {
  console.log("MongoDB Already Connected...", mongoose.connection.name);
  // Drop any existing data
  await mongoose.connection.db.dropDatabase(function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log("DataBase already dropped!!!");
  });

  // Go through each anuncio
  anuncios.map(async data => {
    // Initialize a model with anuncios data
    const anuncio = new Anuncio(data);
    // and save it into the database
    await anuncio.save();
    console.log("Data Saved!!");
    mongoose.connection.close();
  });
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost/nodepop");
