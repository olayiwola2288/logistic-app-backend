const mongoose = require("mongoose");

const model = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderAddress: { type: String, required: true },
  senderPhone: { type: String, required: true },
  pickUpItem: { type: String, required: true },
  itemWeight: { type: String },
  deliveryMode: {
    type: String,
    enum: ["Bicycle", "Bike", "Car", "Truck"],
    required: true,
  },
  receiverName: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  receiverPhone: { type: String, required: true },
  // deliveryType: {
  //   type: String,
  //   enum: ["SameCity", "interCountry", "interCountry"],
  // },
  user: { type: String},
  receiver:{type: boolean, default:false},
  delivered:{type: boolean, default:false}
  
});

const OrderModel = mongoose.model("Order", model);

module.exports = OrderModel;
