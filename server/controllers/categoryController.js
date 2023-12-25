const Category = require("../models/Category");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
// Get all categories
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
});

// Create category
exports.createCategory = catchAsync(async (req, res, next) => {
  const categoryCheck = await Category.findOne({ name: req.body.name });
  if (categoryCheck) {
    return next(new AppError("Category already exists", 400));
  }
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

// Update category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Get category by id
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});
