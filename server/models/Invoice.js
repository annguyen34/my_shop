const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "unpaid",
    enum: ["unpaid", "paid"],
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  couponUsed: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Coupon",
  },
  totalMoney: {
    type: Number,
    required: true,
  },
});

invoiceSchema.pre("save", async function (next) {
  try {
    const order = await Order.findById(this.order);
    const coupon = await Coupon.findById(this.couponUsed);
    if (coupon) {
      this.totalMoney =
        order.totalMoney - (coupon.discountValue * order.totalMoney) / 100;
      coupon.timeUsed += 1;
      await coupon.save();
    } else this.totalMoney = order.totalMoney;
    next();
  } catch (error) {
    next(error);
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
