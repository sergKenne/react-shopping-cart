const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [
      {
        _id: String,
        title: String,
        price: Number,
        count: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
