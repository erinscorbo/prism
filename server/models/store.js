var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  productTitle: { type: String, required: true, max: 100 },
  productDescription: { type: String, required: false, max: 100 },
  price: { type: String, required: false, max: 10 },
});
var StoreSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  city: { type: String, required: true },
  thumbnail: { type: String, required: false },
  Products: [ProductSchema],
});

// Export the model
module.exports = mongoose.model("Store", StoreSchema);
