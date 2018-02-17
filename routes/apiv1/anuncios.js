"use strict";

const express = require("express");
const router = express.Router();

const Anuncio = require("../../models/Anuncio");

/**
 * @api {get} /anuncios Request list of all items
 *
 * @apiSuccess optional {String} name Product Name
 * @apiSuccess optional {Integer} price Filter by Price (50, 50-50, -50, 50-)
 * @apiSuccess optional {Boolean} selling True if it's selling otherwise it's renting
 * @apiSuccess optional {String} tags A comma separated list of strings contained in tags
 * @apiSuccess optional {Integer} page The page number to be retrieved
 * @apiSuccess optional {Integer} limit Limit results to that number
 * @apiSuccess optional {String} sort Sort by this field, i.e: price or -price to reverse
 * @apiSuccess optional {Fields} fields What fields to be included at results
 */
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const price = req.query.price;
    const selling = req.query.selling;
    const tags = req.query.tags;
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    const sort = req.query.sort;
    const fields = req.query.fields;

    console.log(req.query);

    const filter = {};

    if (typeof name !== "undefined") {
      filter.name = { $regex: name, $options: "i" };
    }

    if (typeof price !== "undefined" && price !== "") {
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
      const regex = tags.split(",").join("|");
      filter.tags = { $regex: regex, $options: "i" };
    }

    const docs = await Anuncio.list(filter, skip, limit, sort, fields);

    res.json({
      success: true,
      result: docs,
      pages: pages => {
        if (isNaN(limit) || limit == 0) {
          return 1;
        } else {
          return Math.round(docs.length / limit);
        }
      }
    });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * @api {post} / Create new items
 *
 * @apiSuccess optional {String} name Product Name
 * @apiSuccess optional {Integer} price The price
 * @apiSuccess optional {Boolean} selling True if it's selling otherwise it's renting
 * @apiSuccess optional {String} tags A comma separated list of strings
 * @apiSuccess optional {Integer} photo the file name stored in DB
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
 * @api {delete} /:id Remove items from DB
 *
 * @apiSuccess {String} id The item's ID as it's stored in DB
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
 * @api {put} /:id Update an item at DB
 *
 * @apiSuccess {String} id The item's ID as it's stored in DB
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
