"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;
const Anuncio = require("../models/Anuncio");

const anuncios = [
  {
    name: "Bicicleta",
    selling: true,
    price: 230.15,
    photo: "bici.jpg",
    tags: ["lifestyle", "motor"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    name: "iPhone X",
    selling: true,
    price: 5000.0,
    photo: "iphonex.png",
    tags: ["trendi", "postureo", "mobile"]
  },
  {
    name: "Renault Megane",
    selling: true,
    price: 8000.0,
    photo: "renault_megane.png",
    tags: ["lifestyle", "coche", "coupe", "2.0"]
  },
  {
    name: "MacBook Pro 11'",
    selling: false,
    price: 2500.87,
    photo: "macbook_pro.png",
    tags: ["macbook", "notebook", "2017"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    name: "iPhone 3GS",
    selling: false,
    price: 50.0,
    photo: "iphone.png",
    tags: ["lifestyle", "mobile"]
  }
];

conn.once("open", () => {
  console.log("MongoDB Already Connected...", mongoose.connection.name);
  // Drop any existing data
  mongoose.connection.db.dropDatabase(function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log("DataBase already dropped!!!");
  });

  // Go through each anuncio
  anuncios.map(data => {
    // Initialize a model with anuncios data
    const anuncio = new Anuncio(data);
    // and save it into the database
    anuncio.save();
  });

  return true;
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost/nodepop");
