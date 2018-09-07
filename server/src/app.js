const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

// 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leads');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});
// 

app.get("/leads", (req, res) => {
  res.send([
    {
      title: "WordPress Leads",
      description: "5000"
    }
  ]);
});

app.listen(process.env.PORT || 8084);