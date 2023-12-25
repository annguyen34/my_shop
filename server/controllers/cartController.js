const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const Inventory = require("../models/inventoryModel");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  if (cart) {
    const itemIndex = cart.products.findIndex((p) => p.productId == productId);
    // Check if product exists in cart
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    await cart.save();
    return res.status(201).json(cart);
  } else {
    // No cart for user, create new cart
    const newCart = await Cart.create({
      userId: req.user._id,
      products: [{ productId, quantity: 1 }],
    });
    return res.status(201).json(newCart);
  }
});
