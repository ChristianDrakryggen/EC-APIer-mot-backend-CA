const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  products: [
    {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      count: {
        type: String,
        required: true,
      },
    },
  ],
  handled: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
