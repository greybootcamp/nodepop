"use strict";

const express = require("express");
const router = express.Router();

const Anuncio = require("../../models/Anuncio");

/**
 * @api {get} /anuncios Request list of agents
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const price = req.query.price;
    const selling = req.query.selling;
    const tags = req.query.tags;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;

    console.log(req.query);

    const filter = {};

    if (typeof name !== "undefined") {
      filter.name = { $regex: name };
    }

    if (typeof price !== "undefined") {
      const parsedPrice = price.split("-");

      if (parsedPrice.length === 1) {
        filter.price = parseFloat(price);
      } else {
        const minPrice = parseFloat(parsedPrice.shift());
        const maxPrice = parseFloat(parsedPrice.shift());

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          filter.price = { $gte: minPrice, $lte: maxPrice };
        } else if (isNaN(minPrice) && !isNaN(maxPrice)) {
          {
            filter.price = { $lte: maxPrice };
          }
        } else if (!isNaN(minPrice) && isNaN(maxPrice)) {
          {
            filter.price = { $gte: minPrice };
          }
        }
      }
    }

    if (typeof selling !== "undefined") {
      filter.selling = selling;
    }

    if (typeof tags !== "undefined") {
      filter.tags = { $in: tags.split(",") };
    }

    const docs = await Anuncio.list(filter, skip, limit, sort, fields);

    res.json({ success: true, result: docs });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * @api {post} /add_anuncio Request list of agents
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post("/", (req, res, next) => {
  console.log(req.body);

  const data = req.body;

  // creamos documento de agente en memoria
  const anuncio = new Anuncio(data);

  // lo persistimos en la base de datos
  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: anuncioGuardado });
  });
});

/**
 * @api {delete} /:id Request list of agents
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Anuncio.remove({ _id: _id }).exec();
    res.json({ success: true });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * @api {put} /:id Request list of agents
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.put("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const anuncioActualizado = await Anuncio.findByIdAndUpdate(_id, data, {
      new: true
    });

    res.json({ success: true, result: anuncioActualizado });
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
