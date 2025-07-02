const Wishlist = require("./../db/wishlist");

async function addToWishlist(userId, productId) {
  let wishlist = new Wishlist({
    userId: userId,
    productId: productId,
  });
  await wishlist.save();
  return wishlist.toObject();
}

async function removeFromWishlist(userId, productId) {
  await Wishlist.deleteMany({ userId: userId, productId: productId });
  return;
}

async function getAllWishlist(userId) {
  let wishlist = await Wishlist.find({ userId: userId }).populate('productId');
  return wishlist.map((c) => c.toObject().productId);
}

module.exports = { addToWishlist, removeFromWishlist, getAllWishlist };
