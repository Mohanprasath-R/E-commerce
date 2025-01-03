const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ image: { type: String } }],
  category: { type: String, required: true },
  seller: { type: String, required: true },
  stock: { type: Number, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
