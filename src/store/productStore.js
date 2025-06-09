const Product = require('../models/Product');

exports.createProduct = (data) => {
  const product = new Product(data);
  return product.save();
};

exports.findById = (productId) => {
  return Product.findById(productId);
};

exports.updateProductQuantity = (productId, quantity) => {
  return Product.findByIdAndUpdate(
    productId,
    { quantity },
    { new: true }
  );
};

exports.updateProductAfterCheckout = (productId, newQuantity, orderQuantity) => {
  return Product.findByIdAndUpdate(
    productId,
    {
      quantity: newQuantity,
      $inc: { totalOrders: orderQuantity }
    },
    { new: true }
  );
};

exports.updateProduct = (productId, updateData) => {
  return Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }
  );
};

exports.getAllProducts = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return Product.find().skip(skip).limit(limit);
};

exports.getTotalProductsCount = () => {
  return Product.countDocuments();
};

exports.getTotalOrders = () => {
  return Product.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: '$totalOrders' }
      }
    }
  ]);
};

exports.getMostOrderedProduct = () => {
  return Product.findOne().sort({ totalOrders: -1 }).select('name totalOrders');
};

exports.getLeastOrderedProduct = () => {
  return Product.findOne({ totalOrders: { $gt: 0 } }).sort({ totalOrders: 1 }).select('name totalOrders');
};

exports.getInventoryStatus = () => {
  return Product.find().select('name quantity').sort({ name: 1 });
};

exports.deleteProduct = (productId) => {
  return Product.findByIdAndDelete(productId);
};
