const productController = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
router
  .route("/:id")
  .get(productController.getProduct)
  .delete(productController.deleteProduct);

module.exports = router;
