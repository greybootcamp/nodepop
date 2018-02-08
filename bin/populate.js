"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;
const Anuncio = require("../models/Anuncio");

const anuncios = [
  {
    nombre: "Bicicleta",
    venta: true,
    precio: 230.15,
    foto: "bici.jpg",
    tags: ["lifestyle", "motor"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    nombre: "iPhone X",
    venta: true,
    precio: 5000.0,
    foto: "iphonex.png",
    tags: ["trendi", "postureo", "mobile"]
  },
  {
    nombre: "Renault Megane",
    venta: true,
    precio: 8000.0,
    foto: "renault_megane.png",
    tags: ["lifestyle", "coche", "coupe", "2.0"]
  },
  {
    nombre: "MacBook Pro 11'",
    venta: false,
    precio: 2500.87,
    foto: "macbook_pro.png",
    tags: ["macbook", "notebook", "2017"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.png",
    tags: ["lifestyle", "mobile"]
  }
];

conn.once("open", () => {
  console.log("MongoDB Already Connected...", mongoose.connection.name);
  // Drop any existing data
  mongoose.connection.db.dropDatabase(function(err, result) {
    console.log("DataBase already dropped!!!");
  });

  // Go through each movie
  anuncios.map(data => {
    // Initialize a model with anuncios data
    const anuncio = new Anuncio(data);
    // and save it into the database
    anuncio.save();
  });

  process.exit(1);
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost/nodepop");
