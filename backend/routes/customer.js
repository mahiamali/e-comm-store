const express = require("express");
const router = express.Router();
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");

router.get("/new-products", async (req, res) => {
  let result = await getNewProducts();
  res.send(result);
});

router.get("/featured-products", async (req, res) => {
  let result = await getFeaturedProducts();
  res.send(result);
});

module.exports = router;