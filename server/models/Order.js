const mongoose = require("mongoose");
const Product = require("./Product");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        status: {
          type: Boolean,
          default: true,
        },
      },
    ],
    totalMoney: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "served", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  try {
    let totalMoney = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = await Product.findById(this.products[i].productId);
      totalMoney += product.price * this.products[i].quantity;
    }
    this.totalMoney = totalMoney;
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
