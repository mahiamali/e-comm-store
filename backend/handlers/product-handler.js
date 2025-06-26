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

async function getNewProducts() {
  let products = await Product.find({
    isNewProduct: true,
  });
  return products.map((c) => c.toObject());
}

async function getFeaturedProducts() {
  let products = await Product.find({
    isFeatured: true,
  });
  return products.map((c) => c.toObject());
}

async function getProductForListing(
  searchTerm,
  categoryId,
  brandId,  
  sortBy,
  sortOrder,
  page,
  pageSize,
) {
  if (!sortBy) {
    sortBy = "price";
  }

  if (!sortOrder) {
    sortOrder = -1;
  }

  let queryFilter = {};
  if (searchTerm) {
    queryFilter.$or = [
      {
        name: { $regex: ".*" + searchTerm + "*." },
      },
      {
        shortDescription: { $regex: ".*" + searchTerm + "*." },
      },
    ];
  }

  if (categoryId) {
    queryFilter.categoryId = categoryId;
  }

  if (brandId) {
    queryFilter.brandId = brandId;
  }

  console.log("queryFilter", queryFilter);

  let products = await Product.find(queryFilter)
    .sort({ [sortBy]: +sortOrder })
    .skip((+page - 1) * +pageSize)
    .limit(+pageSize);
  return products.map((x) => x.toObject());
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
