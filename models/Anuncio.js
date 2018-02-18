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
  page,
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
  return query.exec(function(err, items) {
    Anuncio.count(filter).exec(function(err, count) {
      if (err) return next(err);
      callback({
        products: items,
        current: page,
        pages: Math.ceil(count / limit)
      });
    });
  });
};

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
