var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  status: Boolean,
  hostname: String,
  settings: { heightForm: Number, background: String },
  content_id: [{ type: Schema.Types.ObjectId, ref: "Content" }]
  
});

var Client = mongoose.model("Client", ClientSchema);
module.exports = Client;