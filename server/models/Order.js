const mongoose = require("mongoose");
const Coupon = require("./Coupon");
const Cart = require("./Cart");

const invoiceSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "unpaid",
    enum: ["unpaid", "paid"],
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  couponUsed: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Coupon",
  },
  totalMoney: {
    type: Number,
    default: 0,
  },
});

invoiceSchema.pre("save", async function (next) {
  // Calculate total money using coupon
  try {
    const cart = await Cart.findById(this.cart);
    const coupon = await Coupon.findById(this.couponUsed);
    if (coupon) {
      this.totalMoney =
        cart.totalMoney - (coupon.discountValue * cart.totalMoney) / 100;
      coupon.timeUsed += 1;
      await coupon.save();
    } else this.totalMoney = cart.totalMoney;
    next();
  } catch (error) {
    next(error);
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
