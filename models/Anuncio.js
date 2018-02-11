"use strict";

const mongoose = require("mongoose");

var anuncioSchema = mongoose.Schema({
  name: String,
  selling: Boolean,
  price: Number,
  photo: String,
  tags: [String]
});

anuncioSchema.statics.list = function(
  filter,
  skip,
  limit,
  sort,
  fields,
  callback
) {
  const query = Anuncio.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec(callback);
};

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
