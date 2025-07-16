const express = require("express");
const router = express.Router();
const {
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
  getProductByID,
} = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");
const {
  getAllWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../handlers/wishlist-handler");
const { getAllCart, addToCart, removeFromCart } = require("../handlers/cart-handler");

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
  const { searchTerm, categoryId, brandId, sortBy, sortOrder, page, pageSize } =
    req.query;
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

router.get("/product/:id", async (req, res) => {
  const id = req.params["id"];
  let product = await getProductByID(id);
  res.send(product);
});

router.get("/wishlists", async (req, res) => {
  const userId = req.user.id;
  const items = await getAllWishlist(userId);
  res.send(items);
});

router.post("/wishlists/:id", async (req, res) => {
  const productId = req.params["id"];
  const userId = req.user.id;
  const items = await addToWishlist(userId, productId);
  res.send(items);
});

router.delete("/wishlists/:id", async (req, res) => {
  const productId = req.params["id"];
  const userId = req.user.id;
  await removeFromWishlist(userId, productId);
  res.send({ message: "Deleted from Whishlist!" });
});

//---------------------------------------------------------

router.get("/carts", async (req, res) => {
  const userId = req.user.id;
  const items = await getAllCart(userId);
  res.send(items);
});

router.post("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params["id"];
  const quantity = req.body.quantity;
  const items = await addToCart(userId, productId, quantity);
  res.send(items);
});

router.delete("/carts/:id", async (req, res) => {
  const productId = req.params["id"];
  const userId = req.user.id;
  await removeFromCart(userId, productId);
  res.send({ message: "Deleted from Cart!" });
});

module.exports = router;
