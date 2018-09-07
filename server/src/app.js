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

var Lead = require("../models/lead");

app.get("/", (req, res) => {
  res.send([
    {
      title: "WordPress Leads",
      description: "5000"
    }
  ]);
});

// Fetch all leads
app.get('/leads', (req, res) => {
  Lead.find({}, 'title description', function (error, leads) {
    if (error) { console.error(error); }
    res.send({
      leads: leads
    })
  }).sort({ _id: -1 })
})

// Add new lead
app.post("/add_lead", (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_lead = new Lead({
    title: title,
    description: description
  });

  new_lead.save(function(error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: "Lead saved successfully!"
    });
  });
});

// Fetch single lead
app.get('/lead/:id', (req, res) => {
  var db = req.db;
  Lead.findById(req.params.id, 'title description', function (error, lead) {
    if (error) { console.error(error); }
    res.send(lead)
  })
})

// Update a lead
app.put('/leads/:id', (req, res) => {
  var db = req.db;
  Lead.findById(req.params.id, 'title description', function (error, lead) {
    if (error) { console.error(error); }

    lead.title = req.body.title
    lead.description = req.body.description
    lead.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/leads/:id', (req, res) => {
  var db = req.db;
  Lead.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8084);