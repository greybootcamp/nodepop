require("../lib/connectMongoose");
const fs = require("fs");

const Anuncio = require("../models/Anuncio");
const json = JSON.parse(
  fs.readFileSync(__dirname + "/MOCK_DATA.json", "utf-8")
);

populateData(json).catch(err => console.log(err));

async function populateData(anuncios) {
  try {
    await Anuncio.remove();
    console.log("Deleting all data.");

    await Anuncio.insertMany(anuncios);

    console.log("Data already populated into collection!!");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}
