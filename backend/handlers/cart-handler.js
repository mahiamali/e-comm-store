const Cart = require("./../db/cart");

async function addToCart(userId, productId, quantity) {
  let product = await Cart.findOne({ userId: userId, productId: productId });
  if (product) {
    Cart.findByIdAndUpdate(product._id,{
        quantity: product.quantity + quantity
    })
  } else {
    product = new Cart({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
  }
  await product.save();
  return product.toObject();
}

async function removeFromWishlist(userId, productId) {
  await Wishlist.deleteMany({ userId: userId, productId: productId });
  return;
}

async function getAllWishlist(userId) {
  let wishlist = await Cart.find({ userId: userId }).populate("productId");
  return wishlist.map((c) => c.toObject().productId);
}

module.exports = { addToWishlist, removeFromWishlist, getAllWishlist };
