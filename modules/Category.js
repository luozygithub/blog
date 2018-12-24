var mongoose = require("mongoose");
var categories = require("../schemas/categories");

module.exports = mongoose.model("Category", categories)
