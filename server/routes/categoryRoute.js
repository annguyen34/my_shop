const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.createCategory
  );
router
  .route("/:id")
  .get(categoryController.getCategory)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
