const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: String,
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  image_url: String,
  description: String,
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Product', productSchema);