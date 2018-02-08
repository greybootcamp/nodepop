"use strict";

const mongoose = require("mongoose");

var anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
