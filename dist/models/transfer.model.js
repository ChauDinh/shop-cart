"use strict";

const mongoose = require("mongoose");

const TransferSchema = mongoose.Schema({
  create_by: String,
  amount: Number,
  created_at: Date
});

const Transfer = mongoose.model("Transfer", TransferSchema, "transfers");

module.exports = Transfer;