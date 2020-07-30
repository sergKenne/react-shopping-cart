const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String],
});
  
const Product = mongoose.model("product", productSchema);

module.exports = Product;