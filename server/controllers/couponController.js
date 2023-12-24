const Coupon = require("../models/Coupon");
const catchAsync = require("../utils/catchAsync");

exports.getAllCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    status: "success",
    results: coupons.length,
    data: {
      coupons,
    },
  });
});
exports.createCoupon = catchAsync(async (req, res, next) => {
  const newCoupon = await Coupon.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      coupon: newCoupon,
    },
  });
});

exports.getCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      coupon,
    },
  });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
