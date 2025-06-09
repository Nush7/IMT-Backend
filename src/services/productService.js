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

exports.getAnalytics = async () => {
  const [
    totalProducts,
    totalOrdersResult,
    mostOrdered,
    leastOrdered,
    inventoryStatus
  ] = await Promise.all([
    productStore.getTotalProductsCount(),
    productStore.getTotalOrders(),
    productStore.getMostOrderedProduct(),
    productStore.getLeastOrderedProduct(),
    productStore.getInventoryStatus()
  ]);

  const totalOrders = totalOrdersResult.length > 0 ? totalOrdersResult[0].totalOrders : 0;

  return {
    totalProducts,
    totalOrders,
    mostOrdered: mostOrdered ? {
      name: mostOrdered.name,
      quantity: mostOrdered.totalOrders
    } : null,
    leastOrdered: leastOrdered ? {
      name: leastOrdered.name,
      quantity: leastOrdered.totalOrders
    } : null,
    inventoryStatus: inventoryStatus.map(product => ({
      name: product.name,
      quantity: product.quantity
    }))
  };
};

exports.deleteProduct = async (productId) => {
  const deletedProduct = await productStore.deleteProduct(productId);
  if (!deletedProduct) throw new Error('Product not found');
  return deletedProduct;
};