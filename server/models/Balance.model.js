const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  concept: {    type: String,    required: true,  },
  amount: {    type: Number,    required: true,  },
  date: {    type: Date,    default: Date.now(),   required: true,  },
  type: {    type: String,    required: true,  },
});

const Balance = mongoose.model("Balance", BalanceSchema);
module.exports = Balance;
