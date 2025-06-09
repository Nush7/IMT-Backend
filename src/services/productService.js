const productStore = require('../store/productStore');

exports.addProduct = async (productData) => {
  const product = await productStore.createProduct(productData);
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
