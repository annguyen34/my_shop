const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.createProduct
  );
router
  .route("/:id")
  .get(productController.getProduct)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
