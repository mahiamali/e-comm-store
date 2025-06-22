const Product = require("./../db/product");

async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

async function getAllProducts() {
  let products = await Product.find();
  return products.map((c) => c.toObject());
}

async function getProductByID(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
  return;
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
  return;
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
};
