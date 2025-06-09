const productService = require('../services/productService');
const { toProductResponseDTO, toProductListResponseDTO } = require('../utils/mappers/productMapper');

exports.updateQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedProduct = await productService.updateQuantity(id, quantity);
    res.status(200).json({
      success: true,
      message: 'Product quantity updated successfully',
      data: toProductResponseDTO(updatedProduct)
    });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const products = await productService.getProducts(page, limit);
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: toProductListResponseDTO(products)
    });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: toProductResponseDTO(product)
    });
  } catch (err) {
    if (err.message.includes('duplicate key error') && err.message.includes('sku')) {
      return res.status(409).json({
        success: false,
        message: 'Product with this SKU already exists.'
      });
    }
    next(err);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and valid quantity are required'
      });
    }

    const updatedProduct = await productService.checkout(productId, quantity);
    res.status(200).json({
      success: true,
      message: 'Checkout successful',
      data: toProductResponseDTO(updatedProduct)
    });
  } catch (err) {
    if (err.message.includes('Insufficient quantity')) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: toProductResponseDTO(updatedProduct)
    });
  } catch (err) {
    if (err.message.includes('duplicate key error') && err.message.includes('sku')) {
      return res.status(409).json({
        success: false,
        message: 'Product with this SKU already exists.'
      });
    }
    next(err);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const analytics = await productService.getAnalytics();
    res.status(200).json({
      success: true,
      message: 'Analytics retrieved successfully',
      data: analytics
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: toProductResponseDTO(deletedProduct)
    });
  } catch (err) {
    if (err.message === 'Product not found') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    next(err);
  }
};
