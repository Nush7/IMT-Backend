const productStore = require('../store/productStore');
const { toProductModelData } = require('../utils/mappers/productMapper');

exports.addProduct = async (productData) => {
  const modelData = toProductModelData(productData);
  const product = await productStore.createProduct(modelData);
  return product;
};

exports.updateQuantity = async (productId, quantity) => {
  const updatedProduct = await productStore.updateProductQuantity(productId, quantity);
  if (!updatedProduct) throw new Error('Product not found');
  return updatedProduct;
};

exports.getProducts = async (page, limit) => {
  const products = await productStore.getAllProducts(page, limit);
  return products;
};

exports.checkout = async (productId, quantity) => {
  const product = await productStore.findById(productId);
  if (!product) throw new Error('Product not found');

  if (product.quantity < quantity) {
    throw new Error(`Insufficient quantity. Available: ${product.quantity}, Requested: ${quantity}`);
  }

  const newQuantity = product.quantity - quantity;
  const updatedProduct = await productStore.updateProductAfterCheckout(productId, newQuantity, quantity);
  return updatedProduct;
};

exports.updateProduct = async (productId, updateData) => {
  const modelData = toProductModelData(updateData);
  const updatedProduct = await productStore.updateProduct(productId, modelData);
  if (!updatedProduct) throw new Error('Product not found');
  return updatedProduct;
};
