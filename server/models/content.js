var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    lang: String,    
    fields: {},
    buttons: {},
    title: String,
    subtitle: String,
    title_head_form_2: String,
    subtitle_form_2: String,
    title_form_2: String,
    description_terms: String,
    terms_conditions: String
});

var Content = mongoose.model("Content", ContentSchema);
module.exports = Content;