const mongoose = require("mongoose");

const model = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed"],
    required: true,
    default: "pending",
  },
  user: { type: String, required: true },
  confirmedByUser: { type: Boolean, default: false },
  dispatched: { type: Boolean, default: false },

  // addressOfPersonWeArePickingFrom: {type: "string", required: true},
  // phoneNumberOfPersonWeArePickingFrom: {type: "number", required:true},
  // weightOfItem: {type: "number"},
  // receiverName: {type: "string", required: true},
  // receiverAddress: {type: "string", required: true},
  // receiverPhone: {type: "number", required: true},
  // paymentType: {type: "string", required: true},
});

const OrderModel = mongoose.model("Order", model);

module.exports = OrderModel;
