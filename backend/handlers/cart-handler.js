const Cart = require("./../db/cart");

async function addToCart(userId, productId, quantity) {
  let product = await Cart.findOne({ userId: userId, productId: productId });
  if (product) {
    await Cart.findByIdAndUpdate(product._id,{
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

async function removeFromCart(userId, productId) {
  await Cart.findOneAndDelete({ userId: userId, productId: productId });
  return;
}

async function getAllCart(userId) {
  let cart = await Cart.find({ userId: userId }).populate("productId");
  return cart.map((c) => {
    return {quantity: c.quantity, product: c.productId}
  });
}

module.exports = { addToCart, removeFromCart, getAllCart };
