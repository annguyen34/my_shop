const Product = require("../models/Product");
const Category = require("../models/Category");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Inventory = require("../models/Inventory");

// Get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  // TODO: add filter, sort, limit, pagination
  const feature = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const products = await feature.query;
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// Get product by id
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: "category",
    select: "name -_id",
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// Delete product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  await Inventory.findOneAndDelete({ product: req.params.id });
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Create product
exports.createProduct = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ name: req.body.category });

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  req.body.category = category._id;
  const product = await Product.create(req.body);

  await Inventory.create({
    product: product._id,
    quantity: req.body.quantity ? req.body.quantity : 0,
  });
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});
