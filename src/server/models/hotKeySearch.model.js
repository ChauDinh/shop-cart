const mongoose = require("mongoose");

const HotKeySearchSchema = mongoose.Schema({
  name: String,
});

const HotKeySearch = mongoose.model(
  "HotKeySearch",
  HotKeySearchSchema,
  "hotkeys"
);

module.exports = HotKeySearch;
