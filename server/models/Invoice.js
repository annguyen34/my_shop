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

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
