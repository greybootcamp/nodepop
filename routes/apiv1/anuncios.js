"use strict";

const express = require("express");
const router = express.Router();

const Anuncio = require("../../models/Anuncio");

router.get("/", async (req, res, next) => {
  try {
    const docs = await Anuncio.find().exec();
    console.log(docs.length);
    res.json({ success: true, result: docs });
  } catch (err) {
    next(err);
    return;
  }
});

router.get("/:page", function(req, res, next) {
  var perPage = 10;
  var page = req.params.page || 1;

  Anuncio.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, anuncios) {
      Anuncio.count().exec(function(err, count) {
        if (err) return next(err);
        res.render("index", {
          anuncios: anuncios,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});

router.post("/", async (req, res, next) => {
  console.log(req.body);

  const data = req.body;

  // creamos documento de agente en memoria
  const anuncio = new Anuncio(data);

  try {
    const docs = await anuncio.save();
    res.json({ success: true, result: docs });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(409).send(new MyError("Duplicate key", [err.message]));
    }

    res.status(500).send(err);
  }
});

module.exports = router;
