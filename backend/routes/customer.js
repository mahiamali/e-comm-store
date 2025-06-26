const express = require("express");
const router = express.Router();
const {
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
} = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");

router.get("/new-products", async (req, res) => {
  let result = await getNewProducts();
  res.send(result);
});

router.get("/featured-products", async (req, res) => {
  let result = await getFeaturedProducts();
  res.send(result);
});

router.get("/categories", async (req, res) => {
  let categories = await getCategories();
  res.send(categories);
});

router.get("/brands", async (req, res) => {
  let brands = await getBrands();
  res.send(brands);
});

router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, brandId, sortBy, sortOrder, page, pageSize } = req.query;
  let products = await getProductForListing(
    searchTerm,
    categoryId,
    brandId,
    sortBy,
    sortOrder,
    page,
    pageSize
  );
  res.send(products);
});

module.exports = router;
