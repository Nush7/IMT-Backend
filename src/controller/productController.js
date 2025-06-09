const productService = require('../services/productService');

exports.addProduct = async (req, res, next) => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedProduct = await productService.updateQuantity(id, quantity);
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const products = await productService.getProducts(page, limit);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
