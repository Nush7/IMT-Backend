const Product = require('../models/Product');

exports.createProduct = (data) => {
  const product = new Product(data);
  return product.save();
};

exports.updateProductQuantity = (productId, quantity) => {
  return Product.findByIdAndUpdate(
    productId,
    { quantity },
    { new: true }
  );
};

exports.getAllProducts = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return Product.find().skip(skip).limit(limit);
};
