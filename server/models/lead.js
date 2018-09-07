var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LeadSchema = new Schema({
  title: String,
  description: String
});

var Lead = mongoose.model("Lead", LeadSchema);
module.exports = Lead;
