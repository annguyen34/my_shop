const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Product");
const Invoice = require("../models/Invoice");
exports.createOrder = catchAsync(async (req, res, next) => {
  const { products } = req.body;
  const { _id: userId } = req.user;

  const order = await Order.create({ userId, products });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});
