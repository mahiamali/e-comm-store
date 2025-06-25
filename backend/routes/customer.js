const express = require("express");
const router = express.Router();
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");

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

module.exports = router;